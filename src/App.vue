<template>
<v-app>

	<v-navigation-drawer fixed clipped app permanent :mini-variant.sync="mini" class="leftMenu" dark>
		<v-toolbar v-if="user" flat class="transparent">
			<v-list class="pa-0">
				<v-list-tile >
					<!-- <v-list-tile-avatar>
						<img src="https://randomuser.me/api/portraits/men/85.jpg" />
					</v-list-tile-avatar> -->
					<v-list-tile-content>
						<v-list-tile-title>
							<div style="white-space: pre-wrap;">{{userName}}</div>
						</v-list-tile-title>
						<v-list-tile-sub-title>{{user.IdUser}}</v-list-tile-sub-title>
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
			<v-list-group v-for="item in items" :value="item.active" v-bind:key="item.name">
				<v-list-tile slot="item" :to="{path:item.pageName}">
					<v-list-tile-action>
						<v-icon>{{ item.imageUrl }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-sub-title>{{ resources[item.name] }}</v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile v-for="subItem in item.sub" :key="subItem.title" :to="{path:subItem.pageName}">
					<v-list-tile-action>
						<v-icon>{{ subItem.imageUrl }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-sub-title>{{ resources[subItem.name] }}</v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list-group>
		</v-list>
	</v-navigation-drawer>
	<v-toolbar class="topMenu" fixed app dark style="padding-left:0!important">
		<v-toolbar-title>
			<img src="/static/logo.png" alt="Calsonic Kansei" class="mt-3" />
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-menu :nudge-width="100" dark>
			<v-toolbar-title slot="activator">
				<span>{{lenguage.name}}</span>
				<v-icon dark>arrow_drop_down</v-icon>
			</v-toolbar-title>
			<v-list dark>
				<v-list-tile v-for="lenguage in lenguages" :key="lenguage.id" @click="changeLenguage(lenguage.id)">
					<v-list-tile-title v-text="lenguage.name"></v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-menu>
	</v-toolbar>

	<v-content>

		<h1 class="titleBar"> {{title}}</h1>
		<v-slide-y-transition mode="out-in">
			<router-view></router-view>
		</v-slide-y-transition>

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
			return this.$store.getters.Menu;
		},
		user() {
			return this.$store.getters.User;
		},
		userName() {
			const str = this.user.Name;
			return str.replace(/\w\S*/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			})
		},
		title(){
			return this.$store.getters.Title;
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
<style>
table.table thead td:not(:nth-child(1)),
table.table tbody td:not(:nth-child(1)),
table.table thead th:not(:nth-child(1)),
table.table tbody th:not(:nth-child(1)),
table.table thead td:first-child,
table.table tbody td:first-child,
table.table thead th:first-child,
table.table tbody th:first-child {
	padding: 0!important
}

table.table tbody td,
table.table tbody th {
	height: 25px!important;
}

.leftMenu {
	background-color: #4c505d!important;
	border-right: 1px solid #656877!important;
}

.topMenu {
	background-color: #050505!important;
}

.list__tile--active {
	color: red!important
}

h1 {
	color: #0072c6;
}

.titleBar{
	padding-left: 16px;
	background-color: #3d404a;
}
</style>
