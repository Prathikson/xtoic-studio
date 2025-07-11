import clsx from "clsx";

const Button = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
  href,          // optional link href
  target,        // optional target for <a>
  onClick,       // optional click handler
}) => {
  const commonProps = {
    id,
    className: clsx(
      "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-zoroRed px-7 py-3 text-beige",
      containerClass
    ),
    onClick,
  };

  if (href) {
    return (
      <a {...commonProps} href={href} target={target}>
        {leftIcon}
        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
          <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
            {title}
          </div>
          <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
            {title}
          </div>
        </span>
        {rightIcon}
      </a>
    );
  }

  // Default to button
  return (
    <button {...commonProps} type="button">
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
