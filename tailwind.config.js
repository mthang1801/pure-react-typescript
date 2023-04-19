const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '2': '1px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    fontSize: {
      'base': '14px',
      sm: ['14px', {
        lineHeight: '20px',
      }],
      xl: ['18px', {
        lineHeight: '22px',
      }],
      24: ['24px', {
        lineHeight: '30px',
      }],
      36: ['36px', {
        lineHeight: '44px',
      }],
      20: ['20px', {
        lineHeight: '23px',
      }],
      16: ['16px', {
        lineHeight: '20px',
      }],
      18: ['16px', {
        lineHeight: '25px',
      }],
      10: ['10px', {
        lineHeight: '12px',
      }],
      13: ['13px', {
        lineHeight: '15px',
      }],
      12: ['12px', {
        lineHeight: '13px',
      }],
      11: ['11px', {
        lineHeight: '13px',
      }],
      lg: ['14px', {
        lineHeight: '17px',
      }],
    },
    extend: {
      colors: {
        'border': '#BFC4C9',
        'link': '#2980B0',
        'ddv': '#BE1E2D',
        'bgContent': '#FFFFFF',
        'Blue_2': '#2D9CDB',
        'dot': '#C4C4C4',
        'primary_color_1_1': '#BE1E2D',
        'primary_color_1_2': '#E9283A',
        'primary_color_1_3': '#E96C77',
        'primary_color_1_4': '#F2B7BC',
        'tag':'#F1F1F1',
        'status': '#696969',
        'neutral_color_1_1': '#414141',
        'neutral_color_1_2': '#001529',
        'neutral_color_1_3': '#808A94',
        'neutral_color_1_4': '#ADB4BB',
        'neutral_color_1_5': '#BFC4C9',
        'neutral_color_1_6': '#DFE2E4',
        'neutral_color_1_7': '#F0F2F5',
        'neutral_color_1_8': '#FFFFFF',

        'accent_color_1_1': '#1C655E',
        'accent_color_1_2': '#3CAEA4',
        'accent_color_1_3': '#6ED7D3',
        'accent_color_1_4': '#A8EFEB',
        'accent_color_2_1': '#197742',
        'accent_color_2_2': '#38C173',
        'accent_color_2_3': '#74D99F',
        'accent_color_2_4': '#A9EEC1',
        'accent_color_3_1': '#8C6C1F',
        'accent_color_3_2': '#F4CA64',
        'accent_color_3_3': '#FBE2A0',
        'accent_color_3_4': '#FDF4D7',
        'accent_color_4_1': '#891B1A',
        'accent_color_4_2': '#DC3030',
        'accent_color_4_3': '#E46463',
        'accent_color_4_4': '#F5A9A9',
        'accent_color_5_1': '#2980B0',
        'accent_color_5_2': '#40BAFF',
        'accent_color_5_3': '#80D2FF',
        'accent_color_5_4': '#BFE8FF',

      }
    },
  },
  plugins: [],
}
