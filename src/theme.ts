export interface Theme {
  hotCardBackgroundColor: string
  coldCardBackgroundColor: string
  coldGradient: string
  hotGradient: string
  neutralGradient: string
  hotStats: string
  coldStats: string
  grayColor: string
}

export const mainTheme: Theme = {
  hotCardBackgroundColor: "#fffaf1",
  coldCardBackgroundColor: "#f1f2ff",
  coldGradient: "rgba(56, 3, 211, 1)",
  hotGradient: "rgba(214, 90, 41, 1)",
  neutralGradient: "rgba(255, 255, 255, 1)",
  hotStats: "#ffa156",
  coldStats: "#3fa1ea",
  grayColor: "#c8c7c7"
}
