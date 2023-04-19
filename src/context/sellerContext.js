import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const SellerContext = createContext({});

export const SellerProvider = ({ children }) => {
	const [sellerInfo, setSellerInfo] = useState({ user_name: undefined, user_type: undefined, catalog_id: undefined });
	const { stateSignIn } = useSelector((state) => state.accountReducer);

	useEffect(() => {
		if (!stateSignIn.isLoading) {
			const seller = localStorage.getItem("ACCOUNT") ? JSON.parse(localStorage.getItem("ACCOUNT") || "") : {};
			setSellerInfo({
				...sellerInfo,
				avatar: seller?.avatar,
				user_name: seller?.fullName,
				user_type: seller?.user_type,
				catalogs_list: seller?.catalogs?.map((x) => {
					return { ...x, label: x?.catalog_name, value: x?.id };
				}),
				catalog_id: seller?.catalogs?.length > 0 ? seller?.catalogs[0]?.id : undefined
			});
		}
	}, [stateSignIn.isLoading]);

	return <SellerContext.Provider value={{ sellerInfo, setSellerInfo }}>{children}</SellerContext.Provider>;
};

export default SellerContext;
