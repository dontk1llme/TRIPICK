// 자주쓰이는 css
const common = {
    flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
    flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
};

const color = {
    main: '#FFD462',
    sub: '#FFEBB6',
    typo1: '#141414',
    typo2: '#3D3D3D',
    typo3: '#A5A5A5',
    typo4: '#DFDFDF',
    typo5: '#FFFFFF',
    background1: '#FFFAEB',
    background2: '#F7F7F7',
    warning: '#E93636',
};

const shadow = {
    grid: `0px 4px 40px rgba(0, 0, 0, 0.1);`,
    card: `8px 4px 60px rgba(0, 0, 0, 0.08);`,
    button: `8px 4px 40px rgba(0, 0, 0, 0.3);`,
};

const Theme = {
    common,
    color,
    shadow,
};

export default Theme;
