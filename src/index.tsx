import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import './styles/index.scss';
import styles from './styles/index.module.scss';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [statePage, setStatePage] =
		useState<ArticleStateType>(defaultArticleState);

	const [stateForm, setStateForm] =
		useState<ArticleStateType>(defaultArticleState);

	const [stateArrow, setStateArrow] = useState<boolean>(false);

	const updateStyle = () => setStatePage(stateForm);

	const resetStates = () => {
		setStateForm(defaultArticleState);
		setStatePage(defaultArticleState);
	};

	const handleSetState = (option: OptionType) =>
		option.className.includes('font-size')
			? setStateForm((prevState) => ({
					...prevState,
					fontSizeOption: option,
			  }))
			: option.className.includes('font')
			? setStateForm((prevState) => ({
					...prevState,
					fontColor: option,
			  }))
			: option.className.includes('bg')
			? setStateForm((prevState) => ({
					...prevState,
					backgroundColor: option,
			  }))
			: option.className.includes('width')
			? setStateForm((prevState) => ({
					...prevState,
					contentWidth: option,
			  }))
			: setStateForm((prevState) => ({
					...prevState,
					fontFamilyOption: option,
			  }));

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': statePage.fontFamilyOption.value,
					'--font-size': statePage.fontSizeOption.value,
					'--font-color': statePage.fontColor.value,
					'--container-width': statePage.contentWidth.value,
					'--bg-color': statePage.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				stateForm={stateForm}
				setStateForm={(option: OptionType) => handleSetState(option)}
				resetState={resetStates}
				submitState={updateStyle}
				stateButton={stateArrow}
				setStateButton={() => setStateArrow(!stateArrow)}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
