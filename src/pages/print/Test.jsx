/* eslint-disable */
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import SvgArrow from "src/assets/svg/SvgArrow";
import SvgAXIS from "src/assets/svg/SvgAXIS";
import SvgBanner from "src/assets/svg/SvgBanner";
import SvgBannerEdit from "src/assets/svg/SvgBannerEdit";
import SvgBanTayNangHang from "src/assets/svg/SvgBanTayNangHang";
import SvgCheckComplete from "src/assets/svg/SvgCheckComplete";
import SvgClosed from "src/assets/svg/SvgClosed";
import SvgCloseIcon from "src/assets/svg/SvgCloseIcon";
import SvgCont from "src/assets/svg/SvgCont";
import SvgCont1 from "src/assets/svg/SvgCont1";
import SvgDaNhanHang from "src/assets/svg/SvgDaNhanHang";
import SvgDashboard from "src/assets/svg/SvgDashboard";
import SvgEmpty from "src/assets/svg/SvgEmpty";
import SvgExcel from "src/assets/svg/SvgExcel";
import SvgFile from "src/assets/svg/SvgFile";
import SvgGiftAccessory from "src/assets/svg/SvgGiftAccessory";
import SvgGroupUser from "src/assets/svg/SvgGroupUser";
import SvgHoanTatDonHang from "src/assets/svg/SvgHoanTatDonHang";
import SvgHoanThanh from "src/assets/svg/SvgHoanThanh";
import SvgHome from "src/assets/svg/SvgHome";
import SvgIcon3Dot from "src/assets/svg/SvgIcon3Dot";
import SvgIconBan from "src/assets/svg/SvgIconBan";
import SvgIconBell from "src/assets/svg/SvgIconBell";
import SvgIconCreateBill from "src/assets/svg/SvgIconCreateBill";
import SvgIconCustomer from "src/assets/svg/SvgIconCustomer";
import SvgIconDesktop from "src/assets/svg/SvgIconDesktop";
import SvgIconDisplay from "src/assets/svg/SvgIconDisplay";
import SvgIconDown from "src/assets/svg/SvgIconDown";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import SvgIconEmail from "src/assets/svg/SvgIconEmail";
import SvgIconExpand from "src/assets/svg/SvgIconExpand";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconFilter from "src/assets/svg/SvgIconFilter";
import SvgIconFlashSale from "src/assets/svg/SvgIconFLashSale";
import SvgIconGroupBy from "src/assets/svg/SvgIconGroupBy";
import SvgIconHide from "src/assets/svg/SvgIconHide";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgIconInformation from "src/assets/svg/SvgIconInformation";
import SvgIconInstallment from "src/assets/svg/SvgIconInstallment";
import SvgIconKey from "src/assets/svg/SvgIconKey";
import SvgIconListProduct from "src/assets/svg/SvgIconListProduct";
import SvgIconLoading from "src/assets/svg/SvgIconLoading";
import SvgIconLock from "src/assets/svg/SvgIconLock";
import SvgIconMenu from "src/assets/svg/SvgIconMenu";
import SvgIconMoveLeft from "src/assets/svg/SvgIconMoveLeft";

import SvgIconMoveRight from "src/assets/svg/SvgIconMoveRight";
import SvgIconPhone from "src/assets/svg/SvgIconPhone";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconSeo from "src/assets/svg/SvgIconSeo";
import SvgIconSetting from "src/assets/svg/SvgIconSetting";
import SvgIconShop from "src/assets/svg/SvgIconShop";
import SvgIconSitemaps from "src/assets/svg/SvgIconSitemaps";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgIconThumpnails from "src/assets/svg/SvgIconThumpnails";
import SvgIconUpload from "src/assets/svg/SvgIconUpload";
import SvgIconView from "src/assets/svg/SvgIconView";
import SvgIconWallet from "src/assets/svg/SvgIconWallet";
import SvgListed from "src/assets/svg/SvgListed";
import SvgListedCreate from "src/assets/svg/SvgListedCreate";
import SvgLogo from "src/assets/svg/SvgLogo";
import SvgLogout from "src/assets/svg/SvgLogout";
import SvgNhanBangKe from "src/assets/svg/SvgNhanBangKe";
import SvgNhapKhoKhongPhatDuoc from "src/assets/svg/SvgNhapKhoKhongPhatDuoc";
import SvgNhapKhoKhongPhatDuocSide from "src/assets/svg/SvgNhapKhoKhongPhatDuocSide";
import SvgOpen from "src/assets/svg/SvgOpen";
import SvgPage from "src/assets/svg/SvgPage";
import SvgPencil from "src/assets/svg/SvgPencil";
import SvgPrinter from "src/assets/svg/SvgPrinter";
import SvgProfile from "src/assets/svg/SvgProfile";
import SvgPromotionAccessory from "src/assets/svg/SvgPromotionAccessory";
import SvgRouting from "src/assets/svg/SvgRouting";
import SvgSale from "src/assets/svg/SvgSale";
import SvgScan from "src/assets/svg/SvgScan";
import SvgServices from "src/assets/svg/SvgServices";
import SvgSetting from "src/assets/svg/SvgSetting";
import SvgSlogan from "src/assets/svg/SvgSlogan";
import SvgStickers from "src/assets/svg/SvgStickers";
import SvgStorage from "src/assets/svg/SvgStorage";
import SvgTelephone from "src/assets/svg/SvgTelephone";
import SvgTraHang from "src/assets/svg/SvgTraHang";
import SvgTrainNumber from "src/assets/svg/SvgTrainNumber";
import SvgTransport from "src/assets/svg/SvgTransport";
import SVGReason from "src/assets/svg/SVGReason";
import SvgTransUnit from "src/assets/svg/SvgTransUnit";
import SvgTrash from "src/assets/svg/SvgTrash";
import SvgUser from "src/assets/svg/SvgUser";
import SvgUserSetting from "src/assets/svg/SvgUseSetting";
import SvgWarehouse from "src/assets/svg/SvgWarehouse";
import SvgWarehouseIcon from "src/assets/svg/SvgWarehouseIcon";
import SvgWarrantyPacker from "src/assets/svg/SvgWarrantyPacker";
import SvgXeXin from "src/assets/svg/SvgXeXin";
import SvgXuatKhoTraHang from "src/assets/svg/SvgXuatKhoTraHang";
import SvgZone from "src/assets/svg/SvgZone";
import { defaultStyles } from "src/components/inputComponentsStyled/defaultStyles";
import OverlaySpinner from "src/components/typingAnimation/OverlaySpinner";
import TypingAnimation from "src/components/typingAnimation/TypingAnimation";

const Test = () => {
  const array = [
    { svg: <SvgArrow fill="#000" />, name: "SvgArrow" },
    { svg: <SvgAXIS fill="#000" />, name: "SvgAXIS" },
    { svg: <SvgBanner fill="#000" />, name: "SvgBanner" },
    { svg: <SvgBannerEdit fill="#000" />, name: "SvgBannerEdit" },
    { svg: <SvgBanTayNangHang fill="#000" />, name: "SvgBanTayNangHang" },
    { svg: <SvgCheckComplete fill="#000" />, name: "SvgCheckComplete" },
    { svg: <SvgClosed fill="#000" />, name: "SvgClosed" },
    { svg: <SvgCloseIcon fill="#000" />, name: "SvgCloseIcon" },
    { svg: <SvgCont fill="#000" />, name: "SvgCont" },
    { svg: <SvgCont1 fill="#000" />, name: "SvgCont1" },
    { svg: <SvgDaNhanHang fill="#000" />, name: "SvgDaNhanHang" },
    { svg: <SvgDashboard fill="#000" />, name: "SvgDashboard" },
    { svg: <SvgEmpty fill="#000" />, name: "SvgEmpty" },
    { svg: <SvgExcel fill="#000" />, name: "SvgExcel" },
    { svg: <SvgFile fill="#000" />, name: "SvgFile" },
    { svg: <SvgGiftAccessory fill="#000" />, name: "SvgGiftAccessory" },
    { svg: <SvgGroupUser fill="#000" />, name: "SvgGroupUser" },
    { svg: <SvgHoanTatDonHang fill="#000" />, name: "SvgHoanTatDonHang" },
    { svg: <SvgHoanThanh fill="#000" />, name: "SvgHoanThanh" },
    { svg: <SvgHome fill="#000" />, name: "SvgHome" },
    { svg: <SvgIcon3Dot fill="#000" />, name: "SvgIcon3Dot" },
    { svg: <SvgIconBan fill="#000" />, name: "SvgIconBan" },
    { svg: <SvgIconBell fill="#000" />, name: "SvgIconBell" },
    { svg: <SvgIconCreateBill fill="#000" />, name: "SvgIconCreateBill" },
    { svg: <SvgIconCustomer fill="#000" />, name: "SvgIconCustomer" },
    { svg: <SvgIconDesktop fill="#000" />, name: "SvgIconDesktop" },
    { svg: <SvgIconDisplay fill="#000" />, name: "SvgIconDisplay" },
    { svg: <SvgIconDown fill="#000" />, name: "SvgIconDown" },
    { svg: <SvgIconEdit fill="#000" />, name: "SvgIconEdit" },
    { svg: <SvgIconEmail fill="#000" />, name: "SvgIconEmail" },
    { svg: <SvgIconExpand fill="#000" />, name: "SvgIconExpand" },
    { svg: <SvgIconExportFile fill="#000" />, name: "SvgIconExportFile" },
    { svg: <SvgIconFilter fill="#000" />, name: "SvgIconFilter" },
    { svg: <SvgIconFlashSale fill="#000" />, name: "SvgIconFlashSale" },
    { svg: <SvgIconGroupBy fill="#000" />, name: "SvgIconGroupBy" },
    { svg: <SvgIconHide fill="#000" />, name: "SvgIconHide" },
    { svg: <SvgIconImportFile fill="#000" />, name: "SvgIconImportFile" },
    { svg: <SvgIconInformation fill="#000" />, name: "SvgIconInformation" },
    { svg: <SvgIconInstallment fill="#000" />, name: "SvgIconInstallment" },
    { svg: <SvgIconKey fill="#000" />, name: "SvgIconKey" },
    { svg: <SvgIconListProduct fill="#000" />, name: "SvgIconListProduct" },
    { svg: <SvgIconLoading fill="#000" />, name: "SvgIconLoading" },
    { svg: <SvgIconLock fill="#000" />, name: "SvgIconLock" },
    { svg: <SvgIconMenu fill="#000" />, name: "SvgIconMenu" },
    { svg: <SvgIconMoveLeft fill="#000" />, name: "SvgIconMoveLeft" },
    { svg: <SvgIconMoveRight fill="#000" />, name: "SvgIconMoveRight" },
    { svg: <SvgIconPhone fill="#000" />, name: "SvgIconPhone" },
    { svg: <SvgIconPlus fill="#000" />, name: "SvgIconPlus" },
    { svg: <SvgIconRefresh fill="#000" />, name: "SvgIconRefresh" },
    { svg: <SvgIconSearch fill="#000" />, name: "SvgIconSearch" },
    { svg: <SvgIconSeo fill="#000" />, name: "SvgIconSeo" },
    { svg: <SvgIconSetting fill="#000" />, name: "SvgIconSetting" },
    { svg: <SvgIconShop fill="#000" />, name: "SvgIconShop" },
    { svg: <SvgIconSitemaps fill="#000" />, name: "SvgIconSitemaps" },
    { svg: <SvgIconStorage fill="#000" />, name: "SvgIconStorage" },
    { svg: <SvgIconThumpnails fill="#000" />, name: "SvgIconThumpnails" },
    { svg: <SvgIconUpload fill="#000" />, name: "SvgIconUpload" },
    { svg: <SvgIconView fill="#000" />, name: "SvgIconView" },
    { svg: <SvgIconWallet fill="#000" />, name: "SvgIconWallet" },
    { svg: <SvgListed fill="#000" />, name: "SvgListed" },
    { svg: <SvgListedCreate fill="#000" />, name: "SvgListedCreate" },
    { svg: <SvgLogo fill="#000" />, name: "SvgLogo" },
    { svg: <SvgLogout fill="#000" />, name: "SvgLogout" },
    { svg: <SvgNhanBangKe fill="#000" />, name: "SvgNhanBangKe" },
    {
      svg: <SvgNhapKhoKhongPhatDuoc fill="#000" />,
      name: "SvgNhapKhoKhongPhatDuo",
    },
    {
      svg: <SvgNhapKhoKhongPhatDuocSide fill="#000" />,
      name: "SvgNhapKhoKhongPhatDuocSide",
    },
    { svg: <SvgOpen fill="#000" />, name: "SvgOpen" },
    { svg: <SvgPage fill="#000" />, name: "SvgPage" },
    { svg: <SvgPencil fill="#000" />, name: "SvgPencil" },
    { svg: <SvgPrinter fill="#000" />, name: "SvgPrinter" },
    { svg: <SvgProfile fill="#000" />, name: "SvgProfile" },
    {
      svg: <SvgPromotionAccessory fill="#000" />,
      name: "SvgPromotionAccessory",
    },
    { svg: <SvgRouting fill="#000" />, name: "SvgRouting" },
    { svg: <SvgSale fill="#000" />, name: "SvgSale" },
    { svg: <SvgScan fill="#000" />, name: "SvgScan" },
    { svg: <SvgServices fill="#000" />, name: "SvgServices" },
    { svg: <SvgSetting fill="#000" />, name: "SvgSetting" },
    { svg: <SvgSlogan fill="#000" />, name: "SvgSlogan" },
    { svg: <SvgStickers fill="#000" />, name: "SvgStickers" },
    { svg: <SvgStorage fill="#000" />, name: "SvgStorage" },
    { svg: <SvgTelephone fill="#000" />, name: "SvgTelephone" },
    { svg: <SvgTraHang fill="#000" />, name: "SvgTraHang" },
    { svg: <SVGReason fill="#000" />, name: "SvgReason" },
    { svg: <SvgTrainNumber fill="#000" />, name: "SvgTrainNumber" },
    { svg: <SvgTransport fill="#000" />, name: "SvgTransport" },
    { svg: <SvgTransUnit fill="#000" />, name: "SvgTransUnit" },
    { svg: <SvgTrash fill="#000" />, name: "SvgTrash" },
    { svg: <SvgUser fill="#000" />, name: "SvgUser" },
    { svg: <SvgUserSetting fill="#000" />, name: "SvgUserSetting" },
    { svg: <SvgWarehouseIcon fill="#000" />, name: "SvgWarehouseIcon" },
    { svg: <SvgWarehouse fill="#000" />, name: "SvgWarehouse" },
    { svg: <SvgWarrantyPacker fill="#000" />, name: "SvgWarrantyPacker" },
    { svg: <SvgXeXin fill="#000" />, name: "SvgXeXin" },
    { svg: <SvgXuatKhoTraHang fill="#000" />, name: "SvgXuatKhoTraHang" },
    { svg: <SvgZone fill="#000" />, name: "SvgZone" },
  ];
  const style = {
    width: "25%",
    display: "flex",
    alignItems: "center",
    height: "50px",
  };
  const width100 = {
    width: "120px",
  };
  const componentRef = useRef();

  return (
    <>
      <div
        className="animationButton globalButton"
        style={{ ["--background"]: "blue", ["--borderColor"]: "red" }}
      >
        Okela
      </div>
      <TypingAnimation
        texts={["Đội xe", "Quản lý", "ABC", "Sting", "Number"]}
        fontSize="40px"
        lineHeight="60px"
        timeTyping="3"
        border="2px solid #000"
        backgroundTyping="#f0f2f5"
      />
      {/* <OverlaySpinner text="OK" /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {array.map((x, index) => (
          <div style={style} key={index}>
            <span style={width100}>{x.name}</span>
            {x.svg}
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
