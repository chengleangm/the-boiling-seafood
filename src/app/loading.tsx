import Image from "next/image";
export default function Loading() {
  return (
    <div className="site-loading" role="status" aria-label="Loading The Boiling Seafood">
      <div className="loading-logo">
        <Image src="/logo/logo (2).png" alt="" width={220} height={220} priority />
      </div>
      <div className="loading-line">
        <span />
      </div>
      <p>Preparing your feast</p>
    </div>
  );
}
