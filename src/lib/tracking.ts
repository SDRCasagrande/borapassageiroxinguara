export const reportConversion = () => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17675637265/ENDYCKrspc4cEJGks-xB',
            'value': 1.0,
            'currency': 'BRL'
        });
    }
};
