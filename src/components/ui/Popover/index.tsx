import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ButtonProps } from "../Button";
import styles from "./Popover.module.scss";
import classNames from "classnames";

type Props = {
  Trigger: (
    props: ButtonProps & React.RefAttributes<HTMLButtonElement>,
  ) => ReactNode;
  popoverClassName?: string;
};

const Popover = ({
  children,
  Trigger,
  popoverClassName,
}: PropsWithChildren<Props>) => {
  const [isVisible, setIsVisible] = useState(false); // Manages the visibility state of the popover
  const popoverRef = useRef<HTMLDivElement>(null); // Reference to the popover element
  const triggerRef = useRef<HTMLButtonElement>(null); // Reference to the button element that triggers the popover

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false); // Close the popover if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.popoverContainer}>
      <Trigger
        ref={triggerRef}
        onClick={toggleVisibility}
        className={styles.popoverTarget}
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      />
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className={classNames(popoverClassName, styles.popoverContent)}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
