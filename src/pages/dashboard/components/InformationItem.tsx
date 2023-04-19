import styled from "styled-components";
interface InformationItem {
  svg?: any;
  svgscale?: any;
  value?: any;
  label?: any;
  width?: any;
  height?: any;
  padding?: any;
  margin?: any;
  svgwidth?: any;
  fontsizevalue?: any;
  fontweightvalue?: any;
  colorvalue?: any;
  fontsizelabel?: any;
  fontweightlabel?: any;
  colorlabel?: any;
  background?: any;
  subbackground?: any;
  subwidth?: any;
  subheight?: any;
  svgcolor?: any;
}
const InformationItem = ({
  svg,
  value,
  label,
  width,
  height,
  padding,
  background,
  margin,
  svgscale,
  subbackground,
  subheight,
  subwidth,
  svgcolor,
}: InformationItem) => {
  return (
    <InformationItemComponent
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      background={background}
      svgscale={svgscale}
      subbackground={subbackground}
      subheight={subheight}
      subwidth={subwidth}
      svgcolor={svgcolor}
    >
      <div className="informationItem__image">{svg}</div>
      <div className="informationItem__content">
        <div className="informationItem__content__value">{value}</div>
        <div className="informationItem__content__label">{label}</div>
      </div>
    </InformationItemComponent>
  );
};

InformationItem.defaultProps = {
  padding: "0px",
  margin: "0px",
  background: "#fff",
  subbackground: "#fff",
  svgScale: 1,
  subwidth: "40px",
  subheight: "40px",
};
export default InformationItem;

const InformationItemComponent = styled.div<InformationItem>`
  display: flex;
  align-items: center;
  background: ${(props) => props.background};
  border-radius: 5px;
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  .informationItem__image {
    background: ${(props) => props.subbackground};
    border-radius: 3px;
    margin-right: 16px;
    height: ${(props) => props.subheight};
    width: ${(props) => props.subwidth};
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      transform: scale(${(props) => props.svgscale});
      path {
        fill: ${(props) => props.svgcolor};
      }
    }
  }
  .informationItem__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: ${(props) => props.subheight};
    height: auto;
    &__label {
      font-size: 14px;
      color: #808a94;
    }
    &__value {
      font-size: 22px;
      color: #000;
      font-weight: 700;
      line-height: 24px;
    }
  }
`;
