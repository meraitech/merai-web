"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const VERT = `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

function readTheme(): number {
  if (typeof document === "undefined" || typeof window === "undefined")
    return 0;
  if (document.documentElement.classList.contains("dark")) return 1;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0;
}

interface GlSurfaceProps {
  fragment: string;
  className?: string | undefined;

  stillTime?: number;

  dprCap?: number;

  resScale?: number;

  fps?: number;
}

export function GlSurface({
  fragment,
  className,
  stillTime = 0,
  dprCap = 1,
  resScale = 1,
  fps = 60,
}: GlSurfaceProps): ReactNode {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const reducedRef = useRef(reducedMotion);
  const renderStillRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    reducedRef.current = reducedMotion;
    renderStillRef.current?.();
  }, [reducedMotion]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 block size-full rounded-[inherit]";
    canvas.setAttribute("aria-hidden", "true");

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,

      powerPreference: "low-power",
    });
    if (!gl) return;
    host.appendChild(canvas);

    const compile = (type: number, src: string): WebGLShader | null => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      canvas.remove();
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      canvas.remove();
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uTheme = gl.getUniformLocation(program, "uTheme");

    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);

    let targetTheme = readTheme();
    let theme = targetTheme;

    let tAccum = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const draw = (time: number): void => {
      gl.uniform1f(uTime, time);
      gl.uniform1f(uTheme, theme);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const renderStill = (): void => {
      theme = targetTheme;
      draw(stillTime);
    };

    let lastW = 0;
    let lastH = 0;
    let resizePending = 0;
    const resize = (): void => {
      const rect = host.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr * resScale));
      const h = Math.max(1, Math.round(rect.height * dpr * resScale));
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      draw(reducedRef.current ? stillTime : tAccum);
    };
    const queueResize = (): void => {
      if (resizePending) return;
      resizePending = requestAnimationFrame(() => {
        resizePending = 0;
        resize();
      });
    };

    const FRAME_MS = 1000 / fps;

    const loop = (): void => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      const dt = now - last;
      if (dt < FRAME_MS - 1) return;
      last = now - (dt % FRAME_MS);

      tAccum += Math.min(dt, 50) * 0.001;

      const k = 1 - Math.pow(1 - 0.08, dt / (1000 / 60));
      theme += (targetTheme - theme) * k;
      draw(tAccum);
    };

    const stop = (): void => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const start = (): void => {
      if (raf || !visible || document.hidden || reducedRef.current) return;
      last = performance.now();
      loop();
    };

    renderStillRef.current = (): void => {
      if (reducedRef.current) {
        stop();
        renderStill();
      } else {
        start();
      }
    };

    resize();

    host.classList.add("bg-transparent!");

    const ro = new ResizeObserver(queueResize);
    ro.observe(host);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) start();
        else stop();
      },
      { rootMargin: "160px" }
    );
    io.observe(host);

    const onVis = (): void => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVis);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onTheme = (): void => {
      targetTheme = readTheme();
      if (reducedRef.current) renderStill();
    };
    mq.addEventListener("change", onTheme);
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributeFilter: ["class"] });

    start();

    return () => {
      stop();
      cancelAnimationFrame(resizePending);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", onTheme);
      document.removeEventListener("visibilitychange", onVis);
      renderStillRef.current = null;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [fragment, stillTime, dprCap, resScale, fps]);

  return (
    <div
      ref={hostRef}
      className={`absolute inset-0 overflow-hidden rounded-[inherit] ${className ?? ""}`}
    />
  );
}
