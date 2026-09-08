import { PRODUCTS } from './products';  
import type { Product } from './products';

export type Persona = {  
  id: string;  
  folder: string;  
  name: string;  
  tags: string[];  
  bio: string;  
  productIds: string[];  
};

export const PERSONAS: Persona[] = [  
  {  
    id: 'alex',  
    folder: 'Alex',  
    name: 'Visionary Anchor',  
    tags: ['Heavy sensation', 'Internal expansion'],  
    bio: "Alex's collection is for people who want sensation with shape. Start with the level of presence your body welcomes today, make room for warm-up and communication, and let every next choice remain optional. The Visionary Anchor is not about proving capacity. It is about choosing equipment that makes the experience feel deliberate.",  
    productIds: ['c-23', 'c-33', 'c-52', 'c-55'],  
  },  
  {  
    id: 'ken',  
    folder: 'Ken',  
    name: 'Systems Architect',  
    tags: ['Impact', 'Restraint', 'Electrical play'],  
    bio: "Ken's collection treats preparation as part of the experience. Every material, attachment point, and setting deserves a clear plan. Choose the tools that make communication easier, review the instructions before play, and keep release and stopping procedures visible from the beginning.",  
    productIds: ['b-05', 'b-06', 'b-07'],  
  },  
  {  
    id: 'jasper',  
    folder: 'Jasper',  
    name: 'F-150 Armor Dom',  
    tags: ['Harness', 'Attachments', 'Function-forward gear'],  
    bio: "Jasper's collection brings bold structure to the room. The look is direct, the hardware is adjustable, and the buying path stays flexible: choose the harness first, then add the attachment that fits the experience you want to explore.",  
    productIds: ['ec720', 'c-81', 'c-82', 'c-83', 'c-84'],  
  },  
  {  
    id: 'marcus',  
    folder: 'Marcus',  
    name: 'Resilient Anchor',  
    tags: ['Glide', 'Weight', 'Deliberate pace'],  
    bio: "Marcus's collection is built around choice without performance pressure. Some customers want a smaller bottle for the bedside table. Others want a larger format for repeated use. Others want the unmistakable weight of a substantial plug. The right selection is the one that matches the experience you are actually ready to have.",  
    productIds: ['c-17', 'c-73', 'c-55', 'c-88', 'c-52'],  
  },  
  {  
    id: 'gabe',  
    folder: 'Gabe',  
    name: 'Primal Pursuit',  
    tags: ['Primal play', 'Glide', 'Return'],  
    bio: "Gabe's collection is about energy with a clear way back. Choose products that support the pace, texture, and play you want, then make room for water, rest, cleanup, and a conversation after the scene. Pursuit works best when everyone knows how to pause.",  
    productIds: ['c-56', 'c-86', 'c-87', 'c-89'],  
  },  
  {  
    id: 'simon',  
    folder: 'Simon',  
    name: 'Bespoke Protégé',  
    tags: ['Natural-feel glide', 'Choice', 'Ritual'],  
    bio: "Simon's collection is for customers who appreciate a clear selection and a polished routine. The natural-feel Id Glide line lets you choose the format that belongs in your drawer, travel kit, or regular ritual without turning one product into a prescription for everyone.",  
    productIds: ['c-67', 'c-68', 'c-69', 'c-70', 'c-71'],  
  },  
];

/** Resolve a persona's mapped product ids to live, buyable Product records. */  
export function getPersonaProducts(persona: Persona): Product[] {  
  const out: Product[] = [];  
  for (const id of persona.productIds) {  
    const p = PRODUCTS.find((product) => product.id === id);  
    if (p) out.push(p);  
  }  
  return out;  
}

/** Build-time guard: every persona mapping must resolve to a live product. */  
export function assertPersonaMappingsAreLive(): void {  
  const errors: string[] = [];  
  for (const persona of PERSONAS) {  
    for (const id of persona.productIds) {  
      const product = PRODUCTS.find((p) => p.id === id);  
      if (!product) {  
        errors.push(`Persona ${persona.id} references missing product id ${id}`);  
      }  
    }  
  }  
  if (errors.length > 0) {  
    throw new Error(`Persona validation failed:\n${errors.join('\n')}`);  
  }  
}

assertPersonaMappingsAreLive();  
