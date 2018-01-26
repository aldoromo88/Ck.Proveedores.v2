<template>
<v-app>

	<v-navigation-drawer fixed app clipped permanent :mini-variant.sync="mini" style="margin-top:70px">
		<v-toolbar flat class="transparent">
			<v-list class="pa-0">
				<v-list-tile avatar>
					<v-list-tile-avatar>
						<img src="https://randomuser.me/api/portraits/men/85.jpg" />
					</v-list-tile-avatar>
					<v-list-tile-content>
						<v-list-tile-title>John Leider</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-btn icon @click.native.stop="mini = !mini">
							<v-icon>chevron_left</v-icon>
						</v-btn>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>
		</v-toolbar>
		<v-list class="pt-0" dense>
			<v-divider></v-divider>
			<v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
				<v-list-tile slot="item" :to="{path:item.path}">
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ item.title }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="{path:subItem.path}">
					<v-list-tile-action>
						<v-icon>{{ subItem.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list-group>
		</v-list>
	</v-navigation-drawer>
	<v-toolbar fixed>
		<v-toolbar-title>
			<img src="/static/logo.png" alt="Calsonic Kansei" class="mt-3" />
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-menu :nudge-width="100">
			<v-toolbar-title slot="activator">
				<span>{{lenguage.name}}</span>
				<v-icon dark>arrow_drop_down</v-icon>
			</v-toolbar-title>
			<v-list>
				<v-list-tile v-for="lenguage in lenguages" :key="lenguage.id" @click="changeLenguage(lenguage.id)">
					<v-list-tile-title v-text="lenguage.name"></v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-menu>
	</v-toolbar>

	<v-content style="margin-top:70px">
		<v-container fluid fill-height>
			<v-slide-y-transition mode="out-in">
				<router-view></router-view>
			</v-slide-y-transition>
		</v-container>
	</v-content>
	<v-footer app>
		<span>&copy; 2018</span>
	</v-footer>
</v-app>
</template>

<script>
import lenguages from '@/lenguagesResources'
import shellResources from '@/lenguagesResources/shell'
export default {
	computed: {
		lenguage() {
			if (this.$store.getters.Lenguage) {
				return lenguages.filter(l => l.id == this.$store.getters.Lenguage)[0];
			}
			return lenguages[0];
		},
		resources() {
			if (!this.$store.getters.Lenguage) {
				return {}
			}
			return shellResources[this.$store.getters.Lenguage];
		},
		items() {
			return [{
					title: this.resources.releases,
					icon: 'dashboard',
					active: false,
					path: '/releases',
				},
				{
					title: this.resources.shipments,
					icon: 'airport_shuttle',
					active: false,
					items: [{
							title: this.resources.newCapture,
							icon: 'note_add',
							active: false,
							path: '/shipments/new',
						},
						{
							title: this.resources.print,
							icon: 'print',
							active: false,
							path: '/shipments/print',
						},
					]
				}
			]
		}
	},
	methods: {
		changeLenguage(lenguage) {
			this.$store.commit('LENGUAGE_CHANGED', lenguage);
		}
	},
	data() {
		return {
			lenguages,
			mini: true,
		}
	},
	mounted() {
		this.changeLenguage("esp")
	}
}
</script>
