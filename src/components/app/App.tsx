import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

export const App = () => {
	const [statePage, setStatePage] =
		useState<ArticleStateType>(defaultArticleState);

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
				statePage={statePage}
				setStatePage={(state: ArticleStateType) => setStatePage(state)}
			/>
			<Article />
		</main>
	);
};
