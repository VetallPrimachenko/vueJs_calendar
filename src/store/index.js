import Vue from 'vue';
import VueX from 'vuex';

Vue.use(VueX);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

export default new VueX.Store({
	state: {
		currentYear: 2018,
		currentMonth: 7,
		eventFormPosX: 0,
		eventFormPosY: 0,
		eventFormActive: false,
		events: [],
		eventFormDate: moment()
	},
	mutations: {
		setCurrentMonth(state, payLoad) {
			state.currentMonth = payLoad;
		},
		setCurrentYear(state, payLoad) {
			state.currentYear = payLoad;
		},
		eventFormPos(state, payload) {
			state.eventFormPosX = payload.x;
			state.eventFormPosY = payload.y
		},
		eventFormActive(state, payload) {
			state.eventFormActive = payload
		},
		addEvent(state, payload) {
			state.events.push(payload)
		},
		eventFormDate(state, payload) {
			state.eventFormDate = payload
		}
	},
	actions: {
		addEvent(context, payload) {
			return new Promise((resolve, reject) => {
				let obj = {
					description: payload,
					date: context.state.eventFormDate
				};
				Axios.post('/add_event', obj).then(response => {
					if (response.status === 200) {
						context.commit('addEvent', obj);
						resolve()
					} else {
						reject()
					}
				})
			})

		}
	}
})