export default interface ITheme {

    fonts: {
        styles: {
            cursive: string,
            paragraph: string,
            heading: string
        },
        sizes: {
            small: string,
            base: string,
            medium: string,
            large: string,
            xlarge: string,
            xxlarge: string
        }
    },

    colors: {
        forecolor: string,
        backcolor: string,
        accentcolor: string,
        successcolor: string,
        errorcolor: string
    },

    padding: {
        small: string,
        base: string,
        medium: string,
        large: string,
        xlarge: string
    },

    margin: {
        tiny: string,
        small: string,
        base: string,
        medium: string,
        large: string,
        xlarge: string
    },

    screen: {
        mobile: string,
        tablet: string,
        desktop: string
    }
};