import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { useRef } from 'react';
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
} from 'src/constants/articleProps';

type Props = {
	stateForm: ArticleStateType;
	setStateForm: (option: OptionType) => void;
	submitState: () => void;
	resetState: () => void;
	stateButton: boolean;
	setStateButton: () => void;
};

export const ArticleParamsForm = (props: Props) => {
	const asideRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: props.stateButton,
		rootRef: asideRef,
		onChange: () => {},
		onClose: () => props.setStateButton(),
	});

	const handleAction = (action: 'apply' | 'clear') =>
		action === 'clear' ? props.resetState() : props.submitState();

	return (
		<>
			<ArrowButton isOpen={props.stateButton} onClick={props.setStateButton} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: props.stateButton,
				})}>
				<form className={styles.form}>
					<Text as={'h2'} size={31} weight={800} uppercase align='left'>
						задайте параметры
					</Text>

					<Select
						selected={props.stateForm.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={props.setStateForm}
					/>
					<RadioGroup
						name='Size'
						selected={props.stateForm.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={props.setStateForm}
					/>
					<Select
						selected={props.stateForm.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={props.setStateForm}
					/>
					<Separator />
					<Select
						selected={props.stateForm.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={props.setStateForm}
					/>
					<Select
						selected={props.stateForm.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={props.setStateForm}
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
