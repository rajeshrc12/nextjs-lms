import Image from "next/image";

const Logo = () => {
  return <Image src={"/logo.svg"} height={130} width={130} alt="logo" />;
};

export default Logo;
