export default function PageBackground({ children }) {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* Base Black */}
      <div className="absolute inset-0 bg-black -z-30" />

      {/* Top Left Glow */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.08),transparent_60%)]" />

      {/* Bottom Right Glow */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.05),transparent_70%)]" />

      {/* Optional Texture */}
      <div
        className="absolute inset-0 -z-10 bg-no-repeat bg-center bg-cover opacity-5"
        style={{ backgroundImage: "url('/bg-texture.png')" }}
      />

      {children}
    </div>
  );
}
