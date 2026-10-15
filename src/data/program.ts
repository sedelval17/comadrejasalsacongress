export const schedule = [
  { id: 'jueves', day: 'Jueves', date: '26', title: 'Final Nacional El Mundial — Parte 1', events: [
    { time: '08:00', name: 'Acreditaciones' },
    { time: '09:00', name: 'Comienza la competencia' },
    { time: '23:00', name: 'Final de la competencia y entrega de premios' },
  ] },
  { id: 'viernes', day: 'Viernes', date: '27', title: 'Final Nacional El Mundial — Parte 2', events: [
    { time: '08:00', name: 'Acreditaciones' },
    { time: '09:00', name: 'Comienza la competencia' },
    { time: '23:00', name: 'Final de la competencia y entrega de premios' },
    { time: '00:00', name: 'Social, toda la noche' },
  ] },
  { id: 'sabado', day: 'Sábado', date: '28', title: 'Talleres internacionales y noche de shows', events: [
    { time: null, name: 'Talleres internacionales' },
    { time: null, name: 'Show social' },
    { time: null, name: 'Battles y DJs en vivo' },
  ] },
  { id: 'domingo', day: 'Domingo', date: '29', title: 'Talleres, masterclass all stars y gran final Battle Master', events: [
    { time: null, name: 'Talleres internacionales' },
    { time: null, name: 'Masterclass All Stars' },
    { time: null, name: 'Final Comadreja Battle Master 1vs1' },
    { time: null, name: 'Social de cierre' },
  ] },
];

export const workshops = [
  { day: 'Sábado', title: 'Charla para competidores', teacher: 'Karen y Ricardo', image: 'artist-karen-ricardo.jpg', handles: ['karenyricardo'] },
  { day: 'Sábado', title: 'Salsa · shines y vueltas combinadas', teacher: 'Karen y Ricardo', image: 'artist-karen-ricardo.jpg', handles: ['karenyricardo'] },
  { day: 'Sábado', title: 'Bachata · shines y vueltas combinadas', teacher: 'Stephanie Lucero', image: 'artist-stephanie-lucero.jpg', handles: ['stephanielucerooffical'] },
  { day: 'Sábado', title: 'Bachata · shines y vueltas combinadas', teacher: 'Cristian Paredes e Isidora Jacob', image: 'artist-isidora-cristian.jpg', handles: ['cl.cristianparedes', 'isidorajacob__'] },
  { day: 'Sábado', title: 'Salsa · shines y vueltas combinadas', teacher: 'Carine y Rafael', image: 'artist-carine-rafael.jpg', handles: ['carineyrafael'] },
  { day: 'Domingo', title: 'Mega Stars Class Bachata', teacher: 'Masterclass de bachata coreográfica con 8 profesores reconocidos', image: 'lineup-group.jpg', handles: [] },
  { day: 'Domingo', title: 'Salsa fusión', teacher: 'Darío Burgenes', image: 'artist-dario-burgenes.jpg', handles: ['darioburgenescandela'] },
  { day: 'Domingo', title: 'Mambo · shines y vueltas combinadas', teacher: 'Ángel Rojas y Carla Martínez', image: 'artist-angel-carly.jpg', handles: ['angelrojas_86'] },
  { day: 'Domingo', title: 'Bachata · shines y vueltas combinadas', teacher: 'Anthony y Belén', image: 'artist-antoni-belen.jpg', handles: ['antoniybelenoficial'] },
];

export const stages = [
  { number: '01', title: 'Eliminatorias y selección nacional', description: 'Cada país clasifica a sus representantes. Los primeros lugares avanzan directo a duelos de semifinal; segundos, terceros y cuartos pasan a repechaje.' },
  { number: '02', title: 'MasteryCamp El Mundial', description: 'Semana intensiva y obligatoria de formación en estilo, nutrición, maquillaje y proyección escénica para todos los clasificados.' },
  { number: '03', title: 'Repechaje', description: 'Segundos, terceros y cuartos lugares compiten por un lugar en semifinales junto a los campeones de cada país.' },
  { number: '04 / 05', title: 'Semifinal y Final', description: 'Duelos y tríos definen a los finalistas, que presentan su coreografía por última vez para coronar a los nuevos campeones mundiales.' },
];

export const categories = {
  styles: ['Salsa', 'Bachata', 'Chachachá', 'Merengue', 'Urbano', 'Contemporáneo', 'Moderno', 'Tango', 'Ballroom'],
  formats: ['Solista', 'Dúo shine', 'Parejas classic', 'Parejas cabaret', 'Grupos', 'Team shine', 'Queer'],
  levels: ['Amateur', 'Profesional', 'ProAm'],
  ages: ['Baby · 4–7', 'Junior · 8–12', 'Juvenil · 13–17', 'Adulto · 18+', 'Senior · 40+'],
};

export const venues = [
  ['Mié 5 ago', 'Jujuy', 'yujuy_producciones'],
  ['Sáb 15 ago', 'La Pampa', 'micaytincho_tym'],
  ['Sáb 5 sep', 'San Juan', 'ndc_productora'],
  ['Sáb 19 sep', 'Neuquén', 'Gonza_Gonzalez2016'],
  ['Sáb 26 sep', 'Buenos Aires', 'GabyMancini_'],
  ['Sáb 26 sep', 'Santiago del Estero', 'Deryk712'],
  ['Sáb 3 oct', 'Tucumán', 'PalladiumTuc'],
  ['Sáb 10 oct', 'Mendoza', 'EduBoschi'],
  ['Sáb 17 oct', 'Formosa', 'IvanLarRosaOK'],
  ['Sáb 24 oct', 'San Luis', 'ArcenioPrimo'],
  ['Sáb 24 oct', 'Santa Fe', 'elite.danceclub'],
  ['Sáb 31 oct', 'Mar del Plata', 'elmundial.mdp.arg'],
  ['Dom 1° nov', 'Córdoba · Final Nacional', 'ComadrejaProducciones'],
];
