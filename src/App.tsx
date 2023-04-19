import 'tailwindcss/tailwind.css';
import './index.css';
import Main from './layout/Main';
import './styles.less';
import './styles/main.css';
import './styles/responsive.css';

function App() {
	return (
		<div className="App">
			<Main>
				<div>Hello</div>
			</Main>
		</div>
	);
}

export default App;
