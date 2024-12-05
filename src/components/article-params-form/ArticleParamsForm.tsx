import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type Props = {
	statePage: ArticleStateType;
	setStatePage: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: Props) => {
	const [stateForm, setStateForm] =
		useState<ArticleStateType>(defaultArticleState);

	const [stateArrow, setStateArrow] = useState<boolean>(false);

	const asideRef = useRef<HTMLDivElement | null>(null);

	const updateStyle = () => props.setStatePage(stateForm);

	const resetStates = () => {
		setStateForm(defaultArticleState);
		props.setStatePage(defaultArticleState);
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

	const switchArrowButton = () => setStateArrow(!stateArrow);

	useOutsideClickClose({
		isOpen: stateArrow,
		rootRef: asideRef,
		onChange: () => {},
		onClose: () => switchArrowButton(),
	});

	const handleAction = (action: 'apply' | 'clear') =>
		action === 'clear' ? resetStates() : updateStyle();

	return (
		<>
			<ArrowButton isOpen={stateArrow} onClick={switchArrowButton} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: stateArrow,
				})}>
				<form className={styles.form}>
					<Text as={'h2'} size={31} weight={800} uppercase align='left'>
						задайте параметры
					</Text>

					<Select
						selected={stateForm.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option: OptionType) => handleSetState(option)}
					/>
					<RadioGroup
						name='Size'
						selected={stateForm.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(option: OptionType) => handleSetState(option)}
					/>
					<Select
						selected={stateForm.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option: OptionType) => handleSetState(option)}
					/>
					<Separator />
					<Select
						selected={stateForm.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option: OptionType) => handleSetState(option)}
					/>
					<Select
						selected={stateForm.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option: OptionType) => handleSetState(option)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleAction}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleAction}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
