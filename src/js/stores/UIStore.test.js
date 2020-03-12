import UIStore from './UIStore';


test('Creating a uiStore', () => {
  const ui = new UIStore();
  expect(ui.theme).toBe('dark');
});

test('Changing a uiStore theme', () => {
    const ui = new UIStore();
    ui.toggle();
    expect(ui.theme).toBe('light');
  });

test('Getting a uiStore theme', () => {
    const ui = new UIStore();
    ui.toggle();
    expect(ui.themeClass).toBe('lightMode');
  });