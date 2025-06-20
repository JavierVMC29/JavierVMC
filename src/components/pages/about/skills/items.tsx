import { Button } from '@/components/ui/button'
import React from 'react'

interface AboutSkillsItemsProps {
  title: string;
  items: string[];
}

const AboutSkillsItems = ({
  title,
  items,
}: AboutSkillsItemsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>
      <div className="flex gap-4 items-center flex-wrap">
        {items.map(item => (
          <Button
            key={item}
            type="button"
            variant={"outline"}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default AboutSkillsItems