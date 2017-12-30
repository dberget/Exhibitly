class AddPresentationLinkTable < ActiveRecord::Migration[5.2]
  def change
    create_table :presentation_links do |t|
      t.references :presentation
      t.string :share_id

      t.timestamps
    end
  end
end
