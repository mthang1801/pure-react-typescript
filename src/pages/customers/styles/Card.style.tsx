import styled from "styled-components";

export const Card = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content : space-between;
	padding: 10px 25px;
	gap: 35px;
	background-color: #F5F5F5;
	margin-bottom: 3px;
	line-height: 19px;
	z-index: unset;
	.card{		
		color : #808A94;		
		&__info{		
			display : flex;			
			align-items : center;		
			&__fullname{
				color : #000;s
				font-weight : 600;
				font-size : 16px;
			}
			& span:not(:first-child){
				margin-left : 5px;
			}
			&__default{
				display : flex;
				align-items : center;
				color : #38C173;
				margin-left: 12px !important;
			}			
		}
		&__address{					
			font-size : 14;
			font-weight : 400;
		}
	}

`;
