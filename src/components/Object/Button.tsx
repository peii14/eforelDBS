interface ButtonProps {
  readonly btn?: string;
}

const Button = ({ btn }: ButtonProps) => {
  return (
    <div className="py-1.5 px-5 bg-primary transition-colors h-max duration-200 hover:bg-primary-HOVER cursor-pointer rounded-full ">
      <p className="text-white text-center">{btn}</p>
    </div>
  );
};
export default Button;
