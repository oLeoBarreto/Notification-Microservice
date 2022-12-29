import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Teste de novo conteudo');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less then 5 caracters', () => {
    expect(() => new Content('Olá')).toThrow();
  });

  it('should not be able to create a notification content with less then 240 caracters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
