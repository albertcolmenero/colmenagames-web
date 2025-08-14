"use client"

import React, { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'

interface LegalContentProps {
  documentType: string | null
  onClose: () => void
}

const documentTitles: Record<string, string> = {
  'aviso-legal': 'Aviso Legal',
  'politica-privacidad': 'Política de Privacidad',
  'politica-cookies': 'Política de Cookies',
  'terminos-condiciones': 'Términos y Condiciones'
}

const documentContents: Record<string, string> = {
  'aviso-legal': `
# Aviso Legal

## 1. Información General

El presente aviso legal regula el uso del sitio web www.colmenaexperience.com (en adelante, "el Sitio Web"), propiedad de **Colmena Experience** (en adelante, "Colmena Experience"), con domicilio social en Barcelona, España.

## 2. Objeto

Colmena Experience pone a disposición de los usuarios de Internet el Sitio Web, que tiene por objeto proporcionar información sobre los servicios ofrecidos por Colmena Experience, así como permitir la solicitud de información y contratación de los mismos.

## 3. Usuarios

El acceso y/o uso del Sitio Web atribuye la condición de usuario (en adelante, "el Usuario"), e implica la aceptación, desde dicho acceso y/o uso, del presente aviso legal.

## 4. Uso del Sitio Web

El Usuario se compromete a utilizar el Sitio Web, los contenidos y servicios de conformidad con la Ley, el presente Aviso Legal, las buenas costumbres y el orden público.

## 5. Propiedad Intelectual e Industrial

Todos los contenidos del Sitio Web, entendiendo por estos a título meramente enunciativo, los textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de Colmena Experience o de terceros.

## 6. Enlaces

En el caso de que en el Sitio Web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, Colmena Experience no ejercerá ningún tipo de control sobre dichos sitios y contenidos.

## 7. Modificaciones

Colmena Experience se reserva el derecho a modificar, en cualquier momento y sin previo aviso, la presentación y configuración del Sitio Web, así como el presente Aviso Legal.

## 8. Legislación Aplicable y Jurisdicción

El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia que pudiera derivarse del acceso o uso del Sitio Web, Colmena Experience y el Usuario se someten a los juzgados y tribunales de Barcelona.
  `,
  'politica-privacidad': `
# Política de Privacidad

## 1. Responsable del Tratamiento

**Colmena Experience** (en adelante, "Colmena Experience"), con domicilio social en Barcelona, España, es el responsable del tratamiento de los datos personales que el Usuario proporcione a través del Sitio Web www.colmenaexperience.com.

## 2. Finalidad del Tratamiento

Los datos personales que el Usuario proporcione a través del Sitio Web serán tratados para las siguientes finalidades:

- Gestionar las solicitudes de información realizadas por el Usuario
- Gestionar la contratación de los servicios ofrecidos por Colmena Experience
- Enviar comunicaciones comerciales sobre productos y servicios de Colmena Experience, siempre que el Usuario haya dado su consentimiento para ello

## 3. Legitimación del Tratamiento

La base legal para el tratamiento de los datos personales del Usuario es:

- La ejecución de un contrato en el que el Usuario es parte o para la aplicación de medidas precontractuales a petición del Usuario
- El consentimiento del Usuario para el envío de comunicaciones comerciales

## 4. Destinatarios de los Datos

Los datos personales del Usuario no serán comunicados a terceros, salvo obligación legal.

## 5. Plazo de Conservación

Los datos personales del Usuario serán conservados durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos.

## 6. Derechos del Usuario

El Usuario puede ejercer sus derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad de los datos dirigiéndose por escrito a Colmena Experience en la dirección postal indicada anteriormente o en la dirección de correo electrónico **maria@bluelife-ventures.com**, adjuntando copia de su DNI o documento identificativo equivalente.

Asimismo, el Usuario tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos.

## 7. Medidas de Seguridad

Colmena Experience ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales del Usuario y evitar su alteración, pérdida, tratamiento o acceso no autorizado.

## 8. Modificaciones

Colmena Experience se reserva el derecho a modificar la presente Política de Privacidad en cualquier momento. En caso de modificación, se lo comunicaremos a través del Sitio Web.
  `,
  'politica-cookies': `
# Política de Cookies

## 1. ¿Qué son las cookies?

Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario (ordenador, tablet, smartphone, etc.) cuando visita un sitio web. Las cookies permiten al sitio web reconocer el dispositivo del usuario y recordar información sobre su visita.

## 2. Tipos de cookies que utilizamos

En el Sitio Web **www.colmenaexperience.com** utilizamos los siguientes tipos de cookies:

### Cookies técnicas
Son aquellas que permiten al usuario la navegación a través del Sitio Web y la utilización de las diferentes opciones o servicios que en ella existen.

### Cookies de análisis
Son aquellas que permiten el seguimiento y análisis del comportamiento de los usuarios del Sitio Web. La información recogida mediante este tipo de cookies se utiliza en la medición de la actividad del Sitio Web.

### Cookies de personalización
Son aquellas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario.

## 3. Cookies de terceros

Utilizamos **Vercel Web Analytics** para analizar el uso del sitio web y mejorar nuestros servicios. Estas cookies nos ayudan a entender cómo los usuarios interactúan con nuestro sitio web.

## 4. ¿Cómo gestionar las cookies?

El Usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo a través de la configuración de las opciones del navegador instalado en su dispositivo.

A continuación, se proporcionan los enlaces a la información sobre la gestión de cookies de los navegadores más utilizados:

- **Google Chrome**: Configuración > Privacidad y seguridad > Cookies
- **Mozilla Firefox**: Configuración > Privacidad y seguridad
- **Safari**: Preferencias > Privacidad
- **Microsoft Edge**: Configuración > Cookies y permisos del sitio

## 5. Modificaciones

Colmena Experience se reserva el derecho a modificar la presente Política de Cookies en cualquier momento. En caso de modificación, se lo comunicaremos a través del Sitio Web.
  `,
  'terminos-condiciones': `
# Términos y Condiciones

## 1. Introducción

Los presentes Términos y Condiciones regulan el uso del sitio web **www.colmenaexperience.com** (en adelante, "el Sitio Web"), propiedad de **Colmena Experience** (en adelante, "Colmena Experience"), con domicilio social en Barcelona, España.

El acceso y uso del Sitio Web atribuye la condición de usuario (en adelante, "el Usuario"), e implica la aceptación, desde dicho acceso y/o uso, de los presentes Términos y Condiciones.

## 2. Servicios

Colmena Experience ofrece servicios de diseño y ejecución de **experiencias gamificadas** para empresas, equipos, instituciones educativas y eventos particulares. Los servicios específicos, sus características y precios serán los que figuren en el Sitio Web en el momento de su contratación.

## 3. Proceso de Contratación

Para contratar los servicios ofrecidos por Colmena Experience, el Usuario deberá seguir el procedimiento establecido en el Sitio Web, que incluye la cumplimentación de un formulario con los datos necesarios para la prestación del servicio.

Una vez recibida la solicitud, Colmena Experience se pondrá en contacto con el Usuario para confirmar la disponibilidad y concretar los detalles del servicio.

**La contratación de los servicios no será efectiva hasta que Colmena Experience confirme expresamente la aceptación del encargo.**

## 4. Precio y Forma de Pago

Los precios de los servicios ofrecidos en el Sitio Web se expresan en euros e incluyen el IVA y cualquier otro impuesto aplicable.

La forma de pago será la que se indique en el Sitio Web en el momento de la contratación, pudiendo consistir en:

- Transferencia bancaria
- Tarjeta de crédito o débito
- Otros medios de pago electrónicos

Colmena Experience se reserva el derecho a solicitar un anticipo del precio total del servicio en el momento de la contratación.

## 5. Cancelaciones y Modificaciones

El Usuario podrá cancelar o modificar los servicios contratados en las siguientes condiciones:

- **Cancelación con más de 30 días de antelación**: devolución del 100% del anticipo
- **Cancelación entre 15 y 30 días de antelación**: devolución del 50% del anticipo
- **Cancelación con menos de 15 días de antelación**: no se realizará devolución del anticipo

Las modificaciones estarán sujetas a disponibilidad y podrán suponer un cambio en el precio del servicio.

## 6. Responsabilidad

Colmena Experience se compromete a prestar los servicios contratados con la máxima diligencia y calidad.

El Usuario se compromete a proporcionar la información necesaria para la correcta prestación del servicio y a cumplir con las normas de participación que se establezcan para cada actividad.

## 7. Propiedad Intelectual

Todos los contenidos del Sitio Web, así como los materiales utilizados en la prestación de los servicios, son propiedad intelectual de Colmena Experience o de terceros que han autorizado su uso.

## 8. Protección de Datos

El tratamiento de los datos personales del Usuario se regirá por lo dispuesto en la **Política de Privacidad** del Sitio Web.

## 9. Legislación Aplicable y Jurisdicción

Los presentes Términos y Condiciones se rigen por la **legislación española**.

Para la resolución de cualquier controversia que pudiera derivarse de la contratación de los servicios de Colmena Experience, las partes se someten a los juzgados y tribunales de Barcelona.
  `
}

export function LegalContent({ documentType, onClose }: LegalContentProps) {
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!documentType) return

    setIsLoading(true)
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setContent(documentContents[documentType] || '')
      setIsLoading(false)
    }, 300)
  }, [documentType])

  if (!documentType) return null

  // Simple markdown-to-HTML conversion
  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return `<h1 key="${index}" class="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">${line.slice(2)}</h1>`
        }
        if (line.startsWith('## ')) {
          return `<h2 key="${index}" class="text-2xl font-semibold text-gray-800 mb-4 mt-6">${line.slice(3)}</h2>`
        }
        if (line.startsWith('### ')) {
          return `<h3 key="${index}" class="text-xl font-semibold text-gray-700 mb-3 mt-4">${line.slice(4)}</h3>`
        }
        
        // Bold text
        if (line.includes('**')) {
          line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
        }
        
        // Lists
        if (line.trim().startsWith('- ')) {
          return `<li key="${index}" class="text-gray-600 mb-2 ml-4">${line.slice(2)}</li>`
        }
        
        // Empty lines
        if (line.trim() === '') {
          return `<br key="${index}" />`
        }
        
        // Regular paragraphs
        return `<p key="${index}" class="text-gray-600 mb-4 leading-relaxed">${line}</p>`
      })
      .join('')
  }

  return (
    <Modal
      isOpen={!!documentType}
      onClose={onClose}
      title={documentTitles[documentType] || 'Documento Legal'}
    >
      <div className="prose prose-sm max-w-none">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div 
            className="legal-content"
            dangerouslySetInnerHTML={{ __html: formatContent(content) }}
          />
        )}
      </div>
    </Modal>
  )
}
