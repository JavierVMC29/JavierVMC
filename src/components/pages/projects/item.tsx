import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import Github from '@/../public/assets/icons/github.svg';
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectsItemProps {
  image: StaticImageData;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  githubHref?: string;
}

const ProjectsItem = ({
  image,
  title,
  description,
  tags,
  href,
  githubHref,
}: ProjectsItemProps) => {
  const buildProjectImage = () => {
    return (
      <Image
        src={image}
        alt={title}
        className={cn("w-full object-cover lg:h-[300px] 2xl:h-[450px] rounded-t-xl border hover:opacity-90", {
          "cursor-not-allowed": !href,
        })}
      />
    );
  }

  return (
    <Card className="h-full py-0">
      <div className="flex flex-col gap-4 h-full">
        {href ? (
          <Link
            href={href}
            className="lg:h-[300px] 2xl:h-[450px]"
            target="_blank"
          >
            {buildProjectImage()}
          </Link>
        ) : (
          <div>
            {buildProjectImage()}
          </div>
        )}
        <div className="px-6 py-4 flex flex-col gap-4 justify-between h-full">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl">
              {title}
            </h3>
            <p className="text-secondary text-sm whitespace-break-spaces">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              {tags.map(tag => (
                <Button
                  type="button"
                  variant="outline"
                  key={tag}
                  className="!px-3"
                >
                  <p className="!text-xs">
                    {tag}
                  </p>
                </Button>
              ))}
            </div>
            {href && (
              <>
                <Separator />
                <div className="flex items-center gap-6">
                  <Link
                    href={href}
                    className="flex gap-2"
                    target="_blank"
                  >
                    <ExternalLink size={24} />
                  </Link>
                  {githubHref && (
                    <div className="flex gap-2">
                      <Link
                        href={githubHref}
                        className="flex gap-2"
                        target="_blank"
                      >
                        <Image
                          src={Github}
                          alt={'GitHub'}
                          width={24}
                          height={24}
                          className="dark:invert"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Card >
  )
}

export default ProjectsItem