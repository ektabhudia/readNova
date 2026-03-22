import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function Collapsible({
  open,
  collapsibleClassName = "collapsible-card-edonec",
  headerClassName = "collapsible-header-edonec",
  titleClassName = "title-text-edonec",
  iconButtonClassName = "collapsible-icon-button-edonec",
  contentClassName = "collapsible-content-edonec",
  contentContainerClassName = "collapsible-content-padding-edonec",
  children,
  header
}) {
  const [isOpen, setIsOpen] = useState(open);
  const [height, setHeight] = useState(open ? undefined : 0);
  const ref = useRef(null);

  const handleFilterOpening = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      setHeight(entries[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  return (
    <div className={collapsibleClassName}>
      <div className={headerClassName}>
        <div className={titleClassName}>{header}</div>
        <button
          type="button"
          className={iconButtonClassName}
          onClick={handleFilterOpening}
        >
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className="transition-transform duration-300"
          />
        </button>
      </div>
      <div className={contentClassName} style={{ height }}>
        <div ref={ref}>
          <div className={contentContainerClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
};