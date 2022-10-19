export default function getTypeColor (name) {
    switch (name) {
        case "bug":
            return { color: '#83c300' };
        case "dark":
            return { color: "#5b5466" };
        case "dragon":
            return { color: '#006fc9' };
        case 'electric':
            return { color: '#fbd100' };
        case 'fairy':
            return { color: '#fb89eb' };
        case 'fighting':
            return { color: '#e0306a' };
        case 'fire':
            return { color: '#ff9741' };
        case 'flying':
            return { color: '#89aae3' };
        case 'ghost':
            return { color: '#4c6ab2' };
        case 'grass':
            return { color: '#38bf4b' };
        case 'ground':
            return { color: '#e87236' };
        case 'ice':
            return { color: '#4cd1c0' };
        case 'normal':
            return { color: '#8f9aa3' };
        case 'poison':
            return { color: '#b567ce' };
        case 'psychic':
            return { color: '#ff6675' };
        case 'rock':
            return { color: '#c8b686' };
        case 'shadow':
            return { color: '#5b5466' };
        case 'steel':
            return { color: '#4890a4' };
        case 'unknown':
            return { color: '#5b5466' };
        case 'water':
            return { color: '#3692dc' };
        default:
            return { color: '#5b5466' };
    }
}