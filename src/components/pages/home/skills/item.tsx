/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

interface HomeSkillsItemProps {
  title: string;
  description: string;
  icon: any;
  skills: {
    title: string;
    icon: any;
    invert: boolean;
  }[];
}

const HomeSkillsItem = ({
  title,
  description,
  icon,
  skills
}: HomeSkillsItemProps) => {
  return (
    <Card className="px-5 max-w-[400px] h-full gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center min-w-12 min-h-12 rounded-full theme-background w-fit">
          <Image
            src={icon}
            alt={icon}
            className="min-w-8 min-h-8 dark:invert"
          />
        </div>
        <CardTitle>
          <h3 className="font-bold text-lg">
            {title}
          </h3>
        </CardTitle>
      </div>

      <div className="flex flex-col gap-6 justify-between h-full">
        <p>
          {description}
        </p>
        <div className="flex flex-col gap-4">
          <Separator />
          <div className="flex gap-4 flex-wrap">
            {skills.map(skill => (
              <div
                className="flex gap-2"
                key={skill.title}
              >
                <Image
                  src={skill.icon}
                  alt={skill.title}
                  width={20}
                  height={20}
                  className={cn({
                    "dark:invert": skill.invert,
                  })}
                />
                <p className="text-sm text-secondary">
                  {skill.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default HomeSkillsItem