<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="7" md="6" xs="6" lg="7">
                <v-row>
                    <v-col cols="8">
                        <v-row>
                            <v-col>
                                <v-card>
                                    <v-row class="ma-0" style="border-radius: 10px;" outlined>
                                        <v-col cols="1" style="align-items: center;align-content: center;"><v-icon
                                                color="#f98038">mdi-shield-half-full</v-icon></v-col>
                                        <v-col cols="8" align-self="center"
                                            class="pa-0 ma-0 fontProtecao fontHelvetica">Proteção Total Avarias</v-col>
                                        <v-col cols="2" class="pa-0 ma-0 fontHelvética"
                                            style="font-size: large;align-items: center;align-content: center;color: #f98038;">R$
                                            35,95 / dia</v-col>
                                        <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox
                                                v-model="pTotalAvarias"></v-checkbox></v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                    <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                                        <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Para você ter a
                                            tranquilidade total, vá de Proteção Total Avarias! Com esta proteção
                                            adicional a proteção do carro e ao seguro de terceiros quando contratado,
                                            você conta com a cobertura do carro, vidros e pneus, e ainda tem 100% de
                                            isenção dos custos pré fixados de limite de danos em caso de
                                            acidente.</v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-card>
                                    <v-row class="ma-0" style="border-radius: 10px;" outlined>
                                        <v-col cols="1" style="align-items: center;align-content: center;"><v-icon
                                                color="#f98038">mdi-car-estate</v-icon></v-col>
                                        <v-col cols="8" align-self="center"
                                            class="pa-0 ma-0 fontProtecao fontHelvetica">Proteção de Vidros Premium e
                                            Pneus</v-col>
                                        <v-col cols="2" class="pa-0 ma-0 fontHelvética"
                                            style="font-size: large;align-items: center;align-content: center;color: #f98038;">R$
                                            14,95 / dia</v-col>
                                        <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox
                                                v-model="pVidrosPneus"></v-checkbox></v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                    <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                                        <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Essa proteção
                                            te deixa seguro com relação a danos aos vidros laterais, para-brisas, vidro
                                            traseiro, retrovisores, faróis, lanternas e/ou pneus do veículo segurado.
                                            Dessa forma, se um desses itens sofrer avarias, você tem isenção e não paga
                                            nada. Não há cobertura para roubo ou furto bem como para terceiros.</v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-card>
                                    <v-row class="ma-0" style="border-radius: 10px;" outlined>
                                        <v-col cols="1" style="align-items: center;align-content: center;"><v-icon
                                                color="#f98038">mdi-steering</v-icon></v-col>
                                        <v-col cols="8" align-self="center"
                                            class="pa-0 ma-0 fontProtecao fontHelvetica">Condutor Adicional
                                            Ilimitado</v-col>
                                        <v-col cols="2" class="pa-0 ma-0 fontHelvética"
                                            style="font-size: large;align-items: center;align-content: center;color: #f98038;">R$
                                            19,95 / dia</v-col>
                                        <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox
                                                v-model="condutorAdcional"></v-checkbox></v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                    <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                                        <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Vai precisar
                                            que outros motoristas conduzam o veículo? Com o Condutor Adicional
                                            Ilimitado, outros condutores habilitados e indicados por você em seu
                                            contrato, podem aproveitar a experiência com você</v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-card>
                                    <v-row class="ma-0" style="border-radius: 10px;" outlined>
                                        <v-col cols="1" style="align-items: center;align-content: center;"><v-icon
                                                color="#f98038">mdi-baby-buggy</v-icon></v-col>
                                        <v-col cols="8" align-self="center"
                                            class="pa-0 ma-0 fontProtecao fontHelvetica">Condutor Jovem</v-col>
                                        <v-col cols="2" class="pa-0 ma-0 fontHelvética"
                                            style="font-size: large;align-items: center;align-content: center;color: #f98038;">R$
                                            34,95 / dia</v-col>
                                        <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox
                                                v-model="condutorJovem"></v-checkbox></v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                    <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                                        <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Se você tem
                                            entre 18 e 20 anos adicione para fazer sua reserva.</v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-card>
                                    <v-row class="ma-0" style="border-radius: 10px;" outlined>
                                        <v-col cols="1" style="align-items: center;align-content: center;"><v-icon
                                                color="#f98038">mdi-broom</v-icon></v-col>
                                        <v-col cols="8" align-self="center"
                                            class="pa-0 ma-0 fontProtecao fontHelvetica">Limpeza Garantida</v-col>
                                        <v-col cols="2"
                                            class="pa-0 ma-0 d-flex justify-center align-center fontHelvética"
                                            style="font-size: large;color: #f98038;">R$ 39,95</v-col>
                                        <v-col cols="1" class="pa-0 ma-0 d-flex justify-center align-center"><v-checkbox
                                                v-model="limpezaGarantida"></v-checkbox></v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                    <v-row class="pa-0 ma-0" align-self="center" style="background-color: #f2f2f2;">
                                        <v-col cols="12" align-self="center" class="pa-2 ma-0 fontSmall">Adquira a
                                            Limpeza Garantida para ter mais praticidade na sua locação, e não se
                                            preocupe em lavar o carro para a devolução. Mas lembre-se, em caso de
                                            sujeira excessiva poderá ser necessário realizar uma lavagem
                                            especial.</v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>

                    </v-col>

                    <v-col class="col-12 col-md-6 col-xl-4">
                        <v-card style="border-radius: 10px;width: 350px;border: 1px solid #d6d6d6;" outlined>
                            <v-col cols="12"
                                style="background-color: #f2f2f2;border-bottom: 1px solid #d6d6d6;height: 3.5rem;">
                                <div class="title-section font1">{{ selectedCategory.group }} | {{
                                    selectedCategory.description }}</div>
                            </v-col>
                            <v-col>
                                <v-carousel style="height: 170px;" :continuous="true" show-arrows-on-hover
                                    hide-delimiters cycle>
                                    <v-carousel-item v-for="vehicle in selectedCategory.vehicles" :key="vehicle.id">
                                        <v-img :src="vehicle.image"></v-img>
                                    </v-carousel-item>
                                </v-carousel>
                                <v-row>
                                    <v-col style="text-align: center;" class="font2 fontHelvetica">{{
                                        formatVehicleList() }}</v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" style="text-align: center;">
                                <v-col cols="12" style="text-align: center;" class="fontSmall">Sua reserva garante um
                                    dos modelos de carro acima, estando sujeito à disponibilidade da agência.</v-col>
                            </v-col>
                        </v-card>
                        <v-row class="cardPrice4 fontHelvetica">
                            <v-col cols="8">
                                Diária {{ days }}x {{ money(selectedCategory.price) }}
                            </v-col>
                            <v-col cols="4" class="fontHelvetica">
                                {{ Number(totalDaysValue()).toMoeda(true) }}
                            </v-col>
                            <v-col cols="8" class="fontHelvetica">
                                Taxa 12%
                            </v-col>
                            <v-col cols="4">
                                {{ Number(calculedTax()).toMoeda(true) }}
                            </v-col>
                        </v-row>
                        <v-row class="cardPrice3">
                            <v-col cols="12" class="cardPrice2 fontHelvetica">
                                Valor Total Previsto
                            </v-col>
                            <v-col cols="12" class="cardPrice fontHelvetica">
                                {{ Number(calculatedPrice()).toMoeda(true) }}
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ReservationStep2',

    props: {
        e1: Number,
        selectedCategory: Object,
        startDate: Date,
        endDate: Date,
        value: Number,
    },

    data() {
        return {
            days: 0,
            tax: 0,
            pTotalAvarias: false,
            pVidrosPneus: false,
            condutorAdcional: false,
            condutorJovem: false,
            limpezaGarantida: false,
        }
    },

    watch: {
        e1: {
            handler(newCategory) {
                this.resetCheckboxes();
            },
            deep: true
        }
    },

    methods: {
        calculatedPrice() {
            const date1 = new Date(this.startDate);
            const date2 = new Date(this.endDate);

            const differenceMs = Math.abs(date2.getTime() - date1.getTime());
            const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

            this.days = differenceDays >= 1 ? differenceDays : 1;

            let tax = this.selectedCategory.price * 0.12;
            let value = this.selectedCategory.price + tax;

            value *= this.days;

            if (this.pTotalAvarias == true) value += this.days >= 1 ? (35.95 * this.days) : 35.95;
            if (this.pVidrosPneus == true) value += this.days >= 1 ? (14.95 * this.days) : 14.95;
            if (this.condutorAdcional == true) value += this.days >= 1 ? (19.95 * this.days) : 19.95;
            if (this.condutorJovem == true) value += this.days >= 1 ? (34.95 * this.days) : 34.95;
            if (this.limpezaGarantida == true) value += 39.95;

            return value.toFixed(2);
        },

        resetCheckboxes() {
            this.pTotalAvarias = false;
            this.pVidrosPneus = false;
            this.condutorAdcional = false;
            this.condutorJovem = false;
            this.limpezaGarantida = false;
        },

        formatVehicleList() {
            const vehicleModels = this.selectedCategory.vehicles.slice(0, 3).map((v: { model: any; }) => v.model).join(', ');
            const orSimilar = this.selectedCategory.vehicles.length > 0 ? ', ou similar*' : '';
            return vehicleModels + orSimilar;
        },

        totalDaysValue() {
            return this.days * this.selectedCategory.price;
        },

        calculedTax() {
            const date1 = new Date(this.startDate);
            const date2 = new Date(this.endDate);

            const differenceMs = Math.abs(date2.getTime() - date1.getTime());
            const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

            this.days = differenceDays >= 1 ? differenceDays : 1;

            this.tax = this.selectedCategory.price * 0.12;

            return this.tax * this.days;
        },

        money(value: number) {
            const money = value.toString();
            return money.replace(".", ",");
        },
    },
});
</script>

<style scoped>
.font1 {
    font-weight: bold;
    font-size: 0.9rem;
    color: #f98038;
    letter-spacing: 0.01rem;
    line-height: 1.2rem;
    text-align: center;
}

.font2 {
    font-weight: bold;
    font-size: 0.9rem;
    color: #4a4a4a;
    letter-spacing: 0.01rem;
    line-height: 1.2rem;
    margin-top: 3rem;
    height: 3rem;
}

.fontHelvetica {
    font-family: Helvetica, Helvetica, Arial, sans-serif;
}

.fontSmall {
    font-size: 12px;
    color: #4a4a4a;
    margin: 0px;
    padding: 0px;
}

.fontProtecao {
    font-size: 1rem;
    font-weight: 700;
    color: #f98038;
    margin: 0;
}

.cardPrice {
    text-align: right;
    align-content: center;
    font-weight: bold;
    font-size: xx-large;
    color: white;
    margin: 0px;
    padding: 0px;
}

.cardPrice2 {
    text-align: right;
    align-content: right;
    color: white;
    margin: 0px;
    padding: 10px;
}

.cardPrice3 {
    background: #f98038;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin: 0px;
    padding: 10px;
    height: 8rem;
}

.cardPrice4 {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 1px solid #d6d6d6;
    color: #4a4a4a;
    margin: 0px;
    margin-top: 1rem;
    padding: 10px;
    height: 9rem;
}
</style>
