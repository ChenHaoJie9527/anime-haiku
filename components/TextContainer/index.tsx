import Text1 from "./text-1";

interface TextContainerProps {}

const TextContainer = ({}: TextContainerProps) => {
  return (
    <>
      <Text1
        title="Wave Text"
        description="Wavy text animation with staggered characters"
      />
    </>
  );
};

export default TextContainer;
