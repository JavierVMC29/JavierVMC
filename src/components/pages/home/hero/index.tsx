'use client';

import React, { useEffect, useState } from 'react'
import { useTranslations } from "next-intl";
import { cn } from '@/lib/utils';
import { HERO_CTAS, HERO_CTAS_IMAGES } from '../utils/heroCtas';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { GlobalMessageKeys } from '@/i18n/keys';

const hero = 'Hero';
const cta = 'CTAs';

const HomeHero = () => {
  const t = useTranslations(GlobalMessageKeys.HomePage);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setStartAnimation(true), 250);
  }, []);

  return (
    <div className="flex items-end justify-center mx-auto pt-4">
      <div className="relative overflow-hidden h-[555px]">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col items-center justify-center gap-12 px-5 pt-24 sm:pt-36">
            <h2 className={cn("font-bold text-5xl sm:text-7xl text-center animation-opacity", {
              "animation-opacity-start": startAnimation,
            })}>
              {t(`${hero}.title`)}
            </h2>
            <div className={cn("max-w-3xl animation-opacity", {
              "animation-opacity-start": startAnimation,
            })}>
              <p className="text-2xl sm:text-3xl text-center leading-[160%]">
                {t(`${hero}.content`)}
              </p>
            </div>
          </div>

          <div className={cn("flex items-center gap-8 animation-opacity", {
            "animation-opacity-start": startAnimation,
          })}>
            {HERO_CTAS.map((item) => (
              <Link
                key={t(`${hero}.${cta}.${item}.name`)}
                href={t(`${hero}.${cta}.${item}.path`)}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {t(`${hero}.${cta}.${item}.name`)}
                  <Image
                    src={HERO_CTAS_IMAGES[item]}
                    alt={item}
                    className="dark:invert"
                  />
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className={cn("hero-animation", { "hero-animation-start": startAnimation })}>
          <div className={cn("hero-circle-1", { "hero-animation-active": startAnimation })} />
          <div className={cn("hero-circle-2", { "hero-animation-active": startAnimation })} />
          <div className={cn("hero-circle-3", { "hero-animation-active": startAnimation })} />
        </div>
      </div >
    </div>
  )
}

export default HomeHero