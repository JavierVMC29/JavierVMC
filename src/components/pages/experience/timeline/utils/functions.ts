import Work from '@/../public/assets/icons/briefcase.svg';
import University from '@/../public/assets/icons/university.svg';
import Course from '@/../public/assets/icons/book.svg';

export const handleExperienceTimelineIconImage = (icon: string) => {
  const iconImages = {
    Work: Work,
    University: University,
    Course: Course,
  };
  return iconImages[icon as keyof typeof iconImages];
}