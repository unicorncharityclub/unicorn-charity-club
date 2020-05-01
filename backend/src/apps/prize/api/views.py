from ..models import Prize
from django.http import JsonResponse


def prize_list(request):
    """
    This method is used to return all the prizes added by the admin. These prizes will be given on completion
    of charity projects

    **Context**
    An instance of :model:`prize.Prize`

    **Returns**
    List of prizes
    """
    response = {'status': "Success"}
    images = Prize.objects.all()
    image_list_final = []

    for each_image in images:
        image_list = {}
        image_list["prize_id"] = each_image.id
        image_list["prize_url"] = request.build_absolute_uri(each_image.image.url)
        image_list_final.append(image_list)
    response["image_list"] = image_list_final
    return JsonResponse(response)
