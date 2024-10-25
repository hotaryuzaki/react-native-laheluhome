import { Button, type ButtonProps } from '@rneui/themed';
import { useThemeColor } from '@/hooks/useThemeColor';
import styles from './style';

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  name?: 'default' | 'signInGoogle' | 'logIn';
};

export function ThemedButton({
  style,
  containerStyle,
  lightColor,
  darkColor,
  name,
  type = 'solid',
  onPress,
  children,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button');

  return (
    <Button
      type={type}
      buttonStyle={[
        { backgroundColor },
        styles.defaultThemedButton,
        name === 'signInGoogle' ? styles.signInGoogleButton : undefined,
        name === 'logIn' ? styles.logInButton : undefined,
        style,
      ]}
      containerStyle={[
        name === 'logIn' ? styles.logInButton : undefined,
        containerStyle,
      ]}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Button>
  );
}
