const SvgGiftAccessory = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={20}
		fill="none"
		{...props}
	>
		<g fill={props.fill ? props.fill : '#414141'}>
			<path d="M19.414 7.07h-.586v-.586a.586.586 0 1 0-1.172 0v.586h-.586a.586.586 0 1 0 0 1.172h.586v.586a.586.586 0 1 0 1.172 0v-.586h.586a.586.586 0 1 0 0-1.172zm-2.383-2.343a.586.586 0 1 0 0-1.172.586.586 0 0 0 0 1.172zm-2.343 3.515a.586.586 0 1 0 0-1.172.586.586 0 0 0 0 1.172zm-5.102 6.031a.586.586 0 0 1 .828 0l.172.172v-5.03H9.414v5.03l.172-.172z" />
			<path d="M15.86 9.414h-4.102v6.445a.585.585 0 0 1-1 .415L10 15.516l-.758.758a.584.584 0 0 1-1-.415V9.414h-.328l-4.36 2.517v7.483c0 .324.263.586.587.586h11.718a.585.585 0 0 0 .586-.586V10a.586.586 0 0 0-.586-.586zm-1.378-5.823-1.171-2.03a.587.587 0 0 0-.8-.214l-1.803 1.041a2.463 2.463 0 0 0-.306-1.215A2.327 2.327 0 0 0 8.98.08a2.341 2.341 0 0 0-2.95 2.344l.005.124v.013l.058 1.731-1.445-.9-.002-.002-.106-.066a2.342 2.342 0 0 0-3.505 1.382A2.33 2.33 0 0 0 2.13 7.341L.293 8.378a.586.586 0 0 0-.214.8l1.21 2.03c.162.281.52.377.8.215l12.18-7.031a.586.586 0 0 0 .213-.8zM3.884 6.328c-.56.322-1.278.13-1.6-.429a1.173 1.173 0 0 1 1.635-1.58L5.575 5.35l-1.691.977zm5.62-3.641c-.08.302-.274.554-.545.71l-1.692.978-.066-1.99a1.172 1.172 0 0 1 2.186-.627c.157.272.199.626.117.929z" />
		</g>
	</svg>
);

export default SvgGiftAccessory;
