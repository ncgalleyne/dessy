import { useEffect, useRef } from "react";

export default function FloatingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader with heart-shaped particles
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Hash function for random values
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      // Heart-shaped SDF
      float heartSDF(vec2 p) {
        p.x = abs(p.x);
        float r = length(p);
        float a = atan(p.y, max(p.x, 0.0));
        return r - (sin(a) * sqrt(abs(cos(a))) / sin(a) + 2.0) * 0.3;
      }

      // Alternative heart formula
      float heartShape(vec2 p) {
        float x = p.x;
        float y = p.y - sqrt(abs(p.x)) * 0.5;
        return pow(x, 2.0) + pow(y, 2.0) - 1.0;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Mouse interaction - subtle parallax
        vec2 mouseOffset = (u_mouse / u_resolution - 0.5) * 0.1;
        p += mouseOffset;

        // Background color - Nocturnal Romance Surface
        vec3 bgColor = vec3(0.0627, 0.0784, 0.0824); // #101415
        vec3 color = bgColor;

        // 4 layers of heart particles
        for (float layer = 0.0; layer < 4.0; layer++) {
          float scale = 1.0 + layer * 0.5;
          float speed = 0.5 + layer * 0.3;
          float size = 0.02 - layer * 0.003;
          
          // Grid-based particle placement
          vec2 gridUV = p * scale + vec2(u_time * speed * 0.1, u_time * speed * 0.05);
          vec2 gridID = floor(gridUV);
          vec2 gridPos = fract(gridUV) - 0.5;
          
          // Random seed for this cell
          float seed = hash(gridID + layer * 100.0);
          
          // Only render particles in some cells
          if (seed > 0.7) {
            // Heart shape
            vec2 heartUV = gridPos * 3.0;
            float heartDist = heartShape(heartUV);
            
            // Soft glow
            float glow = smoothstep(0.5, 0.0, abs(heartDist));
            
            // Twinkle effect
            float twinkle = sin(u_time * speed * 2.0 + seed * 6.28) * 0.5 + 0.5;
            glow *= twinkle;
            
            // Color mix between lavender and royal purple
            vec3 lavender = vec3(0.8157, 0.7373, 1.0); // #d0bcff
            vec3 royalPurple = vec3(0.2196, 0.1176, 0.4471); // #381e72
            vec3 particleColor = mix(lavender, royalPurple, seed);
            
            // Add to color
            color += particleColor * glow * 0.8;
          }
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shader
    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    // Create program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up geometry (full screen quad)
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = canvas.height - e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = canvas.height - e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    // Animation loop
    let startTime = performance.now();

    function render() {
      const currentTime = (performance.now() - startTime) / 1000;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(mouseLocation, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}
