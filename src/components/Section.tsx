"use client";

import { ReactNode } from "react";
import Button from "./ui/Button";
import SvgIcon from "./ui/SvgIcon";

interface SectionProps {
  title?: string;
  id?: string;
  children: ReactNode;
  controls?: {
    onPrevClick?: () => void;
    onNextClick?: () => void;
  };
}

export default function Section({
  title,
  id,
  children,
  controls,
}: SectionProps) {
  return (
    <section className="section" id={id}>
      <div className="container">
        {title && (
          <div className="section__top">
            <h2 className="text text--xxl text-bold">{title}</h2>
            <div className="section__options">
              {controls && (
                <>
                  <Button
                    variant="outline"
                    shape="circle"
                    lifted
                    onClick={controls.onPrevClick}
                  >
                    <SvgIcon
                      name="shevron"
                      rotateAngle="-180"
                      size="14"
                      aria-hidden
                    />
                  </Button>
                  <Button
                    variant="outline"
                    shape="circle"
                    lifted
                    onClick={controls.onNextClick}
                  >
                    <SvgIcon name="shevron" size="14" aria-hidden />
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
        <div className="section__body">{children}</div>
      </div>
    </section>
  );
}
