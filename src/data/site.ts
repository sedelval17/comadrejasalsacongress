export const event = {
  name: 'Comadreja Salsa Congress',
  year: 2026,
  dates: '26 al 29 de noviembre',
  startDate: '2026-11-26',
  endDate: '2026-11-29',
  venue: 'Hotel Estilo MB',
  address: 'Almafuerte 40, Villa Carlos Paz, Córdoba',
  city: 'Villa Carlos Paz, Córdoba',
  tagline: 'Más que historia, una experiencia.',
  source: 'https://comadrejaproducciones.com/',
  verifiedAt: '2026-10-15',
};

// Todas las inscripciones se coordinan con Isa, según confirmó la organización.
export const links = {
  fullPass: 'https://wa.me/5493512066467?text=Hola%20Isa%21%20Quiero%20acceder%20al%20FULL%20PASS%20del%20Comadreja%20Salsa%20Congress%202026.',
  mundial: 'https://wa.me/5493512066467?text=Hola%21%20Quiero%20informaci%C3%B3n%20para%20inscribirme%20en%20El%20Mundial%202026%2C%20sede%20C%C3%B3rdoba.',
  info: 'https://wa.me/5493512066467?text=Hola%21%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20Comadreja%20Salsa%20Congress%202026.',
  battle: 'https://wa.me/5493512066467?text=Hola%20Isa%21%20Quiero%20inscribirme%20en%20el%20Comadreja%20Battle%20Master%201vs1.',
  social: 'https://wa.me/5493512066467?text=Hola%21%20Quiero%20reservar%20entrada%20para%20una%20noche%20social%20del%20Comadreja%20Salsa%20Congress%202026.',
  map: 'https://www.google.com/maps?q=Almafuerte+40,+Villa+Carlos+Paz,+C%C3%B3rdoba',
  mapEmbed: 'https://www.google.com/maps?q=Almafuerte+40,+Villa+Carlos+Paz,+C%C3%B3rdoba&output=embed',
};

export const rulebooks = {
  mundial: {
    href: '/documents/reglamento-oficial-el-mundial-2027.pdf',
    title: 'Reglamento oficial El Mundial 2027',
    details: 'PDF · 16 páginas · 7,7 MB.',
    note: 'Reglamento aplicable a la eliminatoria de Córdoba del 1 de noviembre y a la Final Nacional Argentina del 26 y 27 de noviembre de 2026.',
  },
};

export const navigation = [
  { label: 'Inicio', href: '/' },
  { label: 'El Mundial', href: '/el-mundial.html' },
  { label: 'Battle Master', href: '/battle-master.html' },
  { label: 'Talleres', href: '/talleres.html' },
  { label: 'Artistas', href: '/artistas.html' },
  { label: 'Precios', href: '/precios.html' },
  { label: 'Contacto', href: '/contacto.html' },
];

export const socials = [
  { name: 'Comadreja Salsa Congress', handle: '@comadrejasalsacongress', description: 'Cuenta oficial del congreso', url: 'https://www.instagram.com/comadrejasalsacongress/?hl=en' },
  { name: 'El Mundial Argentina', handle: '@elmundial.argentina', description: 'Final Nacional Argentina', url: 'https://www.instagram.com/elmundial.argentina/?hl=en' },
  { name: 'El Mundial Oficial', handle: '@elmundial.oficial', description: 'Cuenta oficial de El Mundial', url: 'https://www.instagram.com/elmundial.oficial/?hl=en' },
];

export const prices = {
  fullPass: '$180.000',
  mundial: '$60.000',
  categories: [
    { label: '1 categoría', amount: '$60.000' },
    { label: '2 categorías', amount: '$60.000 + $30.000' },
    { label: 'Tarifa por varias categorías · consultar', amount: '$60.000 + $20.000 por adicional desde la 2.ª categoría' },
  ],
  categoryNote: 'La tarifa de $20.000 por categoría adicional se calcula desde la segunda. Consultá con Isa a partir de cuántas categorías aplica y el total de tu inscripción.',
  nights: [
    { day: 'Viernes', date: '27 NOV', price: '$25.000', note: 'Comienza a las 00:00 del sábado 28.' },
    { day: 'Sábado', date: '28 NOV', price: '$35.000' },
    { day: 'Domingo', date: '29 NOV', price: '$20.000' },
  ],
  includes: [
    'Inscripción a El Mundial, todas las categorías',
    'Inscripción al Comadreja Battle Master 1vs1',
    'Clases y talleres nacionales e internacionales',
    'Noches de shows',
    'Noches de social, viernes a domingo',
  ],
};

export const videos = [
  { id: 'Q8_uu1Bvp50', title: 'Congreso anterior · video 1' },
  { id: '7aqsAMHaa5Y', title: 'Congreso anterior · video 2' },
  { id: 'Q5g_2ngOzIw', title: 'Congreso anterior · video 3' },
  { id: 'WFRqV3ro49U', title: 'El Mundial · presentación' },
];
