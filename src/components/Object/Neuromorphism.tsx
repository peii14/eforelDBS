import n from "@/styles/Neuromorphism.module.css";

type NeuroProps = {
  whichNeuro: number;
  children: React.ReactNode;
};

const Neuromorphism = ({
  whichNeuro = 1,
  children,
}: NeuroProps): JSX.Element => {
  if (whichNeuro == 1) {
    return <div className={n.NeuroMember}>{children}</div>;
  } else if (whichNeuro == 3) {
    return <div className={n.NeuroDisc}>{children}</div>;
  } else {
    return (
      <div className="cursor-pointer">
        <div className={n.Neuro}>{children}</div>
      </div>
    );
  }
};

export default Neuromorphism;
