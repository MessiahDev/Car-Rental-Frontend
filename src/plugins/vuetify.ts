import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { 
        themes: { 
            light: {
            primary: '#f98038',
            toolbar: '#f98038',
            fundo: '#F5F5F5',
            vcardfundo: '#EEEEEE',
            colorCampo: "#FFFFFF",
            text: '#212121'
            }, 
            dark: {
            primary: '#f98038',
            toolbar: '#1E1E1E',
            fundo: '#1E1E1E',
            vcardfundo: '#1E1E1E',
            colorCampo: "#1E1E1E",
            text: '#D5D5D5',
            }     
        },
    },
});
