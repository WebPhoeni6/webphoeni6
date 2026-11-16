import Image from "next/image";

/**
 * Cover for poster projects. Posters are 4:5, so two of them side by side make a
 * 16:10 tile, the same shape as every other card. Nothing is cropped. A single
 * poster sits centered on a blurred backdrop made from its own colors.
 */
export default function PosterCover({ srcs, title }: { srcs: string[]; title: string }) {
  const list = srcs.slice(0, 2);
  return (
    <div className="relative size-full overflow-hidden bg-[#1b1b1b]">
      <Image src={list[0]} alt="" aria-hidden fill sizes="50vw" className="scale-125 object-cover opacity-60 blur-2xl saturate-125" />
      <div className="absolute inset-0 flex items-center justify-center gap-[3%] px-[6%] py-[10%]">
        {list.map((src) => (
          <div key={src} className="relative aspect-[4/5] h-full overflow-hidden rounded-[0.6rem] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]">
            <Image src={src} alt={title} fill sizes="(min-width: 768px) 22vw, 40vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
