import { LitElement, html, css } from "https://unpkg.com/lit?module";

class PowerFlowCard extends LitElement {
  // 1. Define component properties
  static get properties() {
    return {
      hass: {
        type: Object,
      }, // Home Assistant object (for state)
      config: {
        type: Object,
      }, // User configuration (entities)
    };
  }

  // 2. Constructor & Initial Setup
  constructor() {
    super();
    this.svgPaths = {
      primary:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3NWRy9zdmcxMS5kdGQiPjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJfY2xpcDEiPgogICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjEyIiBoZWlnaHQ9Ijc5MiIvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICAgICAgPGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwMSkiPgogICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLWdyaWQiIHNlcmlmOmlkPSJwb3dlcmxpbmUgZ3JpZCIgdHJhbnNmb3JtPSJtYXRyaXgoMS4wNzQ3NjYsMCwwLDIuMDk1NTExLDAsLTQyNS4wNzU4NjQpIj4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMzc2Ljk0NzksNDQxLjQ4OTYpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCwwTDMuMDEyLDBMMCwwWiIgc3R5bGU9ImZpbGw6d2hpdGU7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSwzNzYuOTQ3OCw0NDEuNDg5MykiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMy4wMTIsMEwwLDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxcHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDM3OC42MjA5LDU3MC42NjUzKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsLTEyOS4xNzZDMCwtMTI5LjE3NiAwLjQzOCwtMTEwLjUyMiAtMC4xNjcsLTEwMS4zNjRDLTAuNjE3LC05NC41NTggNi4yMjYsLTkyLjExMSA5LjAzNSwtODkuNzZDMTUuNjI0LC04NC4yNDggNTAuNjU2LC03MC43NzYgNTAuNjU2LC03MC43NzZDNTAuNjU2LC03MC43NzYgNjUuMTUxLC02NS4xMjkgNTUuMzYyLC02Mi44N0M0NS41NzQsLTYwLjYxMSAtMjg1LjYyNSwwIC0yODUuNjI1LDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==", // grid_line.svg
      out: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3NWRy9zdmcxMS5kdGQiPjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJfY2xpcDEiPgogICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjEyIiBoZWlnaHQ9Ijc5MiIvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICAgICAgPGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwMSkiPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjA3NDc2NiwwLDAsMi4wOTU1MTEsNDEzLjAyMzY3NSw2MTQuMzU4MDU4KSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLW91dHNpZGUiIHNlcmlmOmlkPSJwb3dlcmxpbmUgb3V0c2lkZSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsLTcxLjIzMUwxNy44OCwtNzQuNDQ1QzE3Ljg4LC03NC40NDUgMjIuOTYyLC03My41MDQgMjMuMjQ0LC02Ny4xOThDMjMuNTI3LC02MC44OTMgMjQuNzA5LC0yNS4wMDIgMjQuNzA5LC0yNS4wMDJDMjQuNzA5LC0yNS4wMDIgMjYuOTE1LC0yMS4wODEgMzAuMzAzLC0xOS42NjlDMzIuMjkyLC0xOC44NCA1MC41MzUsLTExLjAwNCA2NS4yNiwtNC42NzRDNzEuMTQsLTIuMTQ3IDc2LjQ2LDAuMTQxIDc5Ljk1OSwxLjY0NkM4Mi43NTMsMi44NDcgODUuODI4LDMuMjE0IDg4LjgyNywyLjcwN0wxNzcuNzA4LC0xMi4zMjgiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==", // grid_out.svg
      solar:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3NWRy9zdmcxMS5kdGQiPjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wMDI0MzksLTIuMDk1NTA1LC0xLjA3NDc2MywtMC4wMDQ3NTYsNDQyLjg5NzM1OSwyOTIuMDEwNzU2KSI+CiAgICAgICAgICAgIDxnIGlkPSJwb3dlcmxpbmUtc29sYXIiIHNlcmlmOmlkPSJwb3dlcmxpbmUgc29sYXIiPgogICAgICAgICAgICAgICAgPHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoMC45OTkyOTcsMC4wMTE4NjgsLTAuMDA1OTA0LDEuMDAzMDEsMTYuODk4MjUsLTY3LjE4MDk5KSIgZD0iTS02Ni42NTgsMzMuNDgyTC0yNy44ODIsMzMuNDgyQy0yMi4yODcsMzMuMjk0IC0xNC41OTEsMzMuNjggLTUuODg0LDM2LjE2M0M4LjM2Miw0MC4yMjYgMTQuOTg0LDQ4LjAxMyAyMC4wNzQsNTIuNjkxQzI0LjI5Nyw1Ni42NzQgMjkuMzM1LDYzLjExNSAzMy41NTgsNjcuMDk5IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTI3LDEyNywxMjcpO3N0cm9rZS13aWR0aDo1cHg7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=", // solar_line.svg
      battery:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3NWRy9zdmcxMS5kdGQiPjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLTEuMDU3NzI3LDAuMzcxNjUzLDAuMTkwNjE3LDIuMDYyMjksMzc1LjAyMjUzOCw0ODIuMjkzMDQpIj4KICAgICAgICAgICAgPGcgaWQ9InBvd2VybGluZS1iYXR0ZXJ5IiBzZXJpZjppZD0icG93ZXJsaW5lIGJhdHRlcnkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTS0yMy42NSwtMi4xMTRMMC4xODksLTIuMTE0IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTI3LDEyNywxMjcpO3N0cm9rZS13aWR0aDo1cHg7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=",
      ev: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3NWRy9zdmcxMS5kdGQiPjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4wNzQ3NjYsMCwwLDIuMDk1NTExLDM0Ny44Nzc2MDcsNDkwLjY3MjgzOCkiPgogICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLWhvdXNlIiBzZXJpZjppZD0icG93ZXJsaW5lIGhvdXNlIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLC0xLjMwNEwtMzAuMjEyLDUuNDcyTC02NS41MDYsLTYuNzc2TC04Mi4xOTQsLTYuMDEiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==",
      bg: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyMzc1IDE1ODQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1taXRlcmxpbWl0OjEwOyI+PHJlY3QgaWQ9IlNlaXRlLTIiIHNlcmlmOmlkPSJTZWl0ZSAyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjM3NSIgaGVpZ2h0PSIxNTgzLjMzMyIgc3R5bGU9ImZpbGw6bm9uZTsiLz48Y2xpcFBhdGggaWQ9Il9jbGlwMSI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIzNzUiIGhlaWdodD0iMTU4My4zMzMiLz48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNfY2xpcDEpIj48ZyBpZD0iTGF5ZXItMSIgc2VyaWY6aWQ9IkxheWVyIDEiPjwvZz48ZyBpZD0iaG91c2UiPjxwYXRoIGQ9Ik0xMDQwLjQyMiwxMTEzLjczOWwxOTcuNjQ2LDgyLjM1NGw5MDUuODgzLC0xNTIuOTQybDAsLTQ0MS4yMTJsLTQwMi4zNTQsLTI2OS4zNzVsLTUwMy41MjksNDQyLjM1NGwtMjA5LjU5MiwtODcuNTY3bC00NjguMDU0LDk0LjYyNWwtMzUyLjA4NywtMTQ1Ljg4M2wwLDM5Ny42NDZsMjkwLjkxMiwxMzEuNzY3YzAsMCAxMDUuODgzLDU4LjgyMSAxMDguMjMzLDcuMDU4YzIuMzU0LC01MS43NjcgLTIuMzUsLTM0OC4yMzcgLTIuMzUsLTM0OC4yMzdsNDAyLjM1LC03NC45MjFsLTIuMzU0LDM2NC4zMzNnMzUuMjk2LDBaIiBzdHlsZT0iZmlsbDojMjAyNzMzO2ZpbGwtcnVsZTpub256ZXJvOyIvPjwvZz48ZyBpZD0icm9vZiI+PHBhdGggZD0iTTEzNDEuMTIxLDY4NC45NTVsMzYyLjgyOSwtMzE0Ljc0MmMwLDAgMjUuODgzLC0zNS4yOTYgODQuNzA0LDBjNTguODI1LDM1LjI5MiA0MjEuMTc5LDI3NS4yOTIgNDIxLjE3OSwyNzUuMjkyYzAsMCA0Ny4wNTgsLTcuMDU4IDIxLjE3NSwtMzAuNTg3Yy0yNS44ODMsLTIzLjUyOSAtNDc3LjY0NiwtMzIwIC00NzcuNjQ2LC0zMjBsLTc0NS44ODMsLTI3MC41ODhsLTUwOC4yMzMsNDQyLjM1bDczOC44MjEsMzA4LjIzOGMwLDAgLTAuOTA4LDAuMjIxIDEwMy4wNTQsLTg5Ljk2MyIgc3R5bGU9ImZpbGw6IzE5MjAyYztmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNNTUxLjg4NSw0ODguNjQybDQ3Ni41OTIsMTk4LjcwOGwtNDY4LjA1NCw5NC42MjVsLTM1Mi4wODgsLTE0NS44ODNsMCwtOTEuNzYybDM0My41NSwtNTUuNjg4WiIgc3R5bGU9ImZpbGw6IzFhMjIyZDtmaWxsLXJ1bGU6bm9uemVybzsiLz48L2c+PGcgaWQ9InJvb2YtZ2FyYWdlIiBzZXJpZjppZD0icm9vZiBnYXJhZ2UiPjwvZz48ZyBpZD0id2luZG93cyI+PHBhdGg+PC9nPjxwYXRoIGQ9Ik02MDYuNjIsOTMwLjg1NWwwLjg2MiwyNDEuNzA4bDEzOC44MjEsLTMyLjk0MmMwLDAgNTIuNzY3LC00NC43NjMgNTQuOTA0LC02NC43MDhjMi4xMzgsLTE5Ljk0MiAwLjI0MiwtMjEuNTQyIC01LjQ5MiwtMjUuNDg3Yy01LjczMywtMy45NSAtNi44MjUsLTEzLjk3NSAtNDYuMjc1LC0xNi4wNzljLTM5LjQ1LC0yLjEwNCAtODcuMDU4LC00NS44OTYgLTg3LjA1OCwtNDUuODk2bC01NS43NjMsLTU2LjU5NloiIHN0eWxlPSJmaWxsOiMwYzExMTg7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGg+PC9nPjxwYXRoIGQ9Ik02MDUuNzE1LDg2My41ODhjMCwwIDUwLjM5NiwtMTYuNTE3IDg4LjgyNSwtMTcuM2MzOC40MzMsLTAuNzgzIDY1Ljg4MywxNC4xMTcgNzcuNjQ2LDI1Ljg4M2MxMS43NjcsMTEuNzYyIDUzLjMzMyw2NC4zMTIgODUuMDIsNzkuNjIzYzE2LjYzOSw3LjkwNCAzMS41OTIsMTYuODk2IDM1LjU3MSwyMC4zMDhMNDcxLjY0MSw1MjguMjEzTDc2Mi4yNTcsNTAxLjgyMSIgc3R5bGU9ImZpbGw6IzE2MWIyNTtmaWxsLXJ1bGU6bm9uemVybzsiLz48L2c+PC9nPjwvc3ZnPg==",
    };

    this.lineConfig = [
      {
        id: "solar",
        type: "solar",
        entity_key: "solar_power",
        reverse: true,
        container: "solar",
      },
      {
        id: "battery-charge", 
        type: "bat-charge",
        entity_key: "battery_charge_power", 
        reverse: false, 
        container: "battery", 
        pathKey: "battery",
      },
      {
        id: "battery-discharge", 
        type: "bat-discharge", 
        entity_key: "battery_discharge_power", 
        reverse: true,
        container: "battery", 
        pathKey: "battery",
      },
      {
        id: "ev",
        type: "ev",
        entity_key: "ev_charge_power",
        reverse: false,
        container: "ev",
      },
      {
        id: "grid-import",
        type: "grid-import",
        entity_key: "grid_import_power",
        reverse: true,
        container: "primary",
        pathKey: "primary",
      },
      {
        id: "grid-export",
        type: "grid-export",
        entity_key: "grid_export_power",
        reverse: false,
        container: "out",
        pathKey: "out",
      },

      {
        id: "bg",
        type: "bg",
        pathKey: "bg",
        isBackground: true,
        container: "bg",
      },
    ];

    this.isInitialized = false;
  }

  // 3. Lit Lifecycle Hook: Called once when component is first connected.
  firstUpdated() {
    // Map DOM containers once the render() function has run.
    this.lineContainers = {
      bg: this.shadowRoot.getElementById("svg-container-bg"),
      solar: this.shadowRoot.getElementById("svg-container-solar"),
      battery: this.shadowRoot.getElementById("svg-container-battery"),
      ev: this.shadowRoot.getElementById("svg-container-ev"),
      primary: this.shadowRoot.getElementById("svg-container-primary"),
      out: this.shadowRoot.getElementById("svg-container-out"),
    };
    this.loadAllSVGs();
    this.isInitialized = true;
  }

  // 4. HA Lifecycle Hook: Called whenever the state changes.
  set hass(hass) {
    this._hass = hass;
    // Only run flow updates after SVGs have been loaded and mapped.
    if (this.isInitialized) {
      this.updateFlow();
    }
  }

  // --- Core SVG Loading & Processing ---

  ensureGlow(svgEl) {
    if (!svgEl.querySelector("#glow")) {
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      defs.innerHTML = `
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>`;
      svgEl.insertBefore(defs, svgEl.firstChild);
    }
  }

  processSVGString(text, containerEl, lineType) {
    containerEl.innerHTML = text;
    const svgEl = containerEl.querySelector("svg");
    if (!svgEl) return;

    this.ensureGlow(svgEl);

    const colorMap = {
      solar: "gold",
      "grid-import": "dodgerblue",
      "grid-export": "limegreen",
      "bat-charge": "cornflowerblue",
      "bat-discharge": "cornflowerblue", // Use the same color for both
      ev: "deepskyblue",
    };

    const desiredColor = colorMap[lineType] || "red";

    svgEl
      .querySelectorAll("path, circle, rect, line, polyline, polygon")
      .forEach((el) => {
        if (el.nodeName === "rect") {
          return;
        }
        // Add specific classes for the charge/discharge logic
        el.classList.add("anim-line", "battery-line");
        // Add specific class for the initial load of the SVG that contains the path
        if (lineType === "bat-charge" || lineType === "bat-discharge") {
          el.classList.add("battery-path-el");
        } else {
          el.classList.add(lineType);
        }

        el.setAttribute("stroke", desiredColor);
        el.style.setProperty("stroke", desiredColor, "important");
        el.classList.add("flow-off");
      });
  }

  async loadSVG(path, containerEl, lineType, isBackground) {
    try {
      if (!path) throw new Error(`No SVG path provided for ${lineType}`);

      let text;

      // Check if the path is a Base64 Data URI
      if (path.startsWith('data:image/svg+xml;base64,')) {
        // Extract the Base64 part after 'data:image/svg+xml;base64,'
        const base64Data = path.substring(path.indexOf(',') + 1);
        // Decode the Base64 string to get the SVG XML text
        text = atob(base64Data);
      } else {
        // Fallback to network fetch if not a data URI
        const response = await fetch(path);
        if (!response.ok) throw new Error(`SVG load failed: ${response.status} ${response.statusText}`);
        text = await response.text();
      }

      if (isBackground) {
        containerEl.innerHTML = text;
      } else {
        this.processSVGString(text, containerEl, lineType);
      }
    } catch (err) {
      console.error(`Failed to load SVG for "${lineType}" from path "${path}":`, err);

      containerEl.innerHTML = `
                <p style="color:#f99; text-align:center; font-weight:bold;">
                    Error loading ${lineType} SVG
                </p>
            `;

      throw new Error(`SVG load failed for "${lineType}": ${err.message}`);
    }
  }

  loadAllSVGs() {
    // Only process unique path/container combinations to prevent loading the same SVG twice
    const loadedContainers = new Set();

    this.lineConfig.forEach((cfg) => {
      const pathKey = cfg.pathKey || cfg.type;
      const path = this.svgPaths[pathKey];

      const containerId = cfg.container || cfg.id;
      const container = this.lineContainers[containerId];

      if (path && container && !loadedContainers.has(containerId)) {
        this.loadSVG(path, container, cfg.type, cfg.isBackground);
        loadedContainers.add(containerId);
      }
    });
  }

  // --- Flow Control Logic (MODIFIED) ---

  updateFlow() {
    // Use a Set to track which line containers have been processed to avoid re-querying lines
    const processedContainers = new Set();

    // Check Battery state first since it's now two logic flows to one visual line
    const chargeCfg = this.lineConfig.find(c => c.id === 'battery-charge');
    const dischargeCfg = this.lineConfig.find(c => c.id === 'battery-discharge');

    if (chargeCfg && dischargeCfg) {
      const chargeEntityId = this.config.entities[chargeCfg.entity_key];
      const dischargeEntityId = this.config.entities[dischargeCfg.entity_key];

      const chargeState = chargeEntityId ? parseFloat(this._hass.states[chargeEntityId]?.state || 0) : 0;
      const dischargeState = dischargeEntityId ? parseFloat(this._hass.states[dischargeEntityId]?.state || 0) : 0;

      const isCharging = Math.abs(chargeState) > 10;
      const isDischarging = Math.abs(dischargeState) > 10;

      const container = this.lineContainers['battery'];

      if (container) {
        const lines = container.querySelectorAll(".battery-path-el");

        // Determine the flow direction
        let reverseFlow = false;
        let isActive = isCharging || isDischarging;

        if (isCharging) {
          // Power flows TO battery. reverse: false (use chargeCfg.reverse = false)
          reverseFlow = !!chargeCfg.reverse;
        } else if (isDischarging) {
          // Power flows FROM battery. reverse: true (use dischargeCfg.reverse = true)
          reverseFlow = !!dischargeCfg.reverse;
        }

        lines.forEach((line) => {
          line.classList.toggle("flow-active", isActive);
          line.classList.toggle("flow-off", !isActive);
          line.classList.toggle("reverse-flow", reverseFlow);
        });
        processedContainers.add('battery');
      }
    }

    // Process all other lines
    this.lineConfig
      .filter((c) => c.entity_key && c.container !== 'battery') // Skip battery configs, we handled them
      .forEach((cfg) => {
        const container = this.lineContainers[cfg.container || cfg.id];

        // Get the entity ID from the user config
        const entityId = this.config.entities[cfg.entity_key];
        const stateObj = entityId ? this._hass.states[entityId] : null;

        // Get value, default to 0 if unavailable
        const value = stateObj ? parseFloat(stateObj.state) : 0;

        if (container) {
          const lines = container.querySelectorAll(".anim-line");
          const isActive = Math.abs(value) > 10; // 10W threshold

          lines.forEach((line) => {
            line.classList.toggle("flow-active", isActive);
            line.classList.toggle("flow-off", !isActive);
            line.classList.toggle("reverse-flow", !!cfg.reverse);
          });
        }
      });
  }

  // 5. User Configuration: Defines which entities to use
  setConfig(config) {
    if (!config.entities || Object.keys(config.entities).length === 0) {
      throw new Error(
        "You need to define entities for the power flow diagram."
      );
    }
    this.config = config;
  }

  // 6. CSS Styling (in Lit, this is isolated and efficient)
  static get styles() {
    return css`
      /* Card Container Setup */
      :host {
        display: block;
      }
      #svg-overlay {
        position: relative;
        width: 100%;
        height: 500px;
        pointer-events: none;
        padding: 16px;
        box-sizing: border-box;
      }
      #svg-overlay > div {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* Background Styling */
      #svg-container-bg svg {
        opacity: 0.5;
      }

      /* Animated Line Styles */
      .anim-line {
        stroke-dasharray: 20 15;
        animation:
          dash-move 6s linear infinite,
          pulse 5s ease-in-out infinite alternate;
        filter: url(#glow);
        stroke-width: 5px;
        --dash-dir: -200;
      }

      .reverse-flow {
        --dash-dir: 200;
      }

      /* Animation State Controls */
      .flow-active {
        animation-play-state: running !important;
        opacity: 1 !important;
      }
      .flow-off {
        animation-play-state: paused !important;
        opacity: 0.15 !important;
      }

      @keyframes dash-move {
        to {
          stroke-dashoffset: var(--dash-dir);
        }
      }

      @keyframes pulse {
        0% {
          stroke-opacity: 0.6;
          filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0));
        }
        50% {
          stroke-opacity: 1;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
        }
        100% {
          stroke-opacity: 0.6;
          filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0));
        }
      }

      /* Color definitions (these apply classes to the SVG paths) */
      .solar {
        stroke: gold !important;
      }
      .grid-import {
        stroke: dodgerblue !important;
      }
      .grid-export {
        stroke: limegreen !important;
      }
      .ev {
        stroke: deepskyblue !important;
      }
      .bat-charge, .battery-path-el {
        stroke: cornflowerblue !important;
      }
    `;
  }

  // 7. HTML Template (The card structure)
  render() {
    return html`
      <ha-card header="${this.config.name || "Power Flow Diagram"}">
        <div id="svg-overlay">
          <div id="svg-container-bg"></div>
          <div id="svg-container-solar"></div>
          <div id="svg-container-battery"></div>
          <div id="svg-container-ev"></div>
          <div id="svg-container-primary"></div>
          <div id="svg-container-out"></div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("power-flow-card", PowerFlowCard);