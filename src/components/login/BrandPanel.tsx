import Image from "next/image";

export function BrandPanel() {
  return (
    <section className="flex h-[812px] w-full shrink-0 flex-col items-center overflow-hidden bg-brand-primary text-center text-surface-card tablet:h-[1024px] lg:h-screen lg:min-h-[1024px] lg:w-1/2 lg:items-start lg:text-left">
      <Image
        src="/logo-shipnow.svg"
        alt="ShipNow"
        width={264}
        height={72}
        priority
        className="mt-[138px] h-auto w-[160px] tablet:mt-[140px] tablet:w-[264px] lg:ml-[244px] lg:mt-[137px]"
      />

      <div className="relative mt-[54px] h-[263px] w-[256px] tablet:mt-[100px] tablet:h-[443px] tablet:w-[448px] lg:ml-[155px] lg:mt-[41px]">
        <Image
          src="/login-hero-truck.jpg"
          alt="A delivery truck loaded with parcels"
          width={410}
          height={386}
          priority
          className="absolute bottom-0 left-0 h-[220px] w-[234px] rounded-card object-cover tablet:h-login-truck-height tablet:w-login-truck-width"
        />
        <Image
          src="/login-hero-phone.jpg"
          alt="A customer using a phone for delivery tracking"
          width={179}
          height={228}
          priority
          className="absolute right-0 top-0 h-[131px] w-[102px] rounded-control object-cover shadow-card tablet:h-login-phone-height tablet:w-login-phone-width"
        />
      </div>

      <div className="mt-[72px] w-full px-8 tablet:mt-[82px] tablet:px-12 lg:ml-[155px] lg:mt-[94px] lg:w-[487px] lg:px-0">
        <h1 className="text-[40px] font-bold leading-[1.08] text-surface-card tablet:text-[42px] lg:text-[40px]">
          Welcome to ShipNow
        </h1>
        <p className="mx-auto mt-5 max-w-[500px] text-[18px] leading-normal text-surface-card/90 tablet:text-[20px] lg:mx-0 lg:mt-3 lg:text-[16px]">
          Manage your shipments, fleet, and warehouse in one smart dashboard.
        </p>
      </div>
    </section>
  );
}
