const Button = (props) => {
  return (
    <div className="py-1.5 px-5 bg-primary transition-colors duration-200 hover:bg-primary-HOVER cursor-pointer rounded-full ">
      <p className="text-white">{props.btn}</p>
    </div>
  );
};
export default Button;
