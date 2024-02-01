import Image from "next/image";
const loading = () => {
  return (
    <div>
      <h1>Loading...</h1>
      <Image
        src="/sun-6235_512.gif"
        alt="loading"
        width={300}
        height={300}
        className="mx-auto"
      />
    </div>
  );
};

export default loading;
