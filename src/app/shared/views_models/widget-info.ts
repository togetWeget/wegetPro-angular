export class WidgetInfo {
	constructor(
		public title?: string,
		public value?: number,
		public fa?: string,
		public theme?: string,
		public link?: string
		) {}

	public setValue (val: number) {
		this.value = val;
	}
}
